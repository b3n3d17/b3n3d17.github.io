package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"net/url"
	"os"
	"sort"
	"text/template"
)

type StreamingEvent struct {
	TrackName  string `json:"master_metadata_track_name"`
	AlbumName  string `json:"master_metadata_album_album_name"`
	ArtistName string `json:"master_metadata_album_artist_name"`
	MsPlayed   int    `json:"ms_played"`
}

type AlbumStats struct {
	Name              string
	Artist            string
	Plays             int
	Songs             map[string]int
	MusicBrainzURL    string
	MedimopsArtistURL string
	MedimopsAlbumURL  string
}

type SongPlay struct {
	Name  string
	Plays int
}

type TemplateData struct {
	Albums []AlbumStats
	Total  int
}

func main() {
	// Command line flags
	inputFile := flag.String("input", "Streaming_History_Audio_2020-2025.json", "Input JSON file from Spotify export")
	topLimit := flag.Int("limit", 50, "Limit output to top N albums (0 for all)")
	jsonOutput := flag.Bool("json", false, "Output structured JSON instead of Markdown")
	outputFile := flag.String("output", "", "Output file (if not specified, writes to stdout)")
	flag.Parse()

	// Open and read the JSON file
	data, err := os.ReadFile(*inputFile)
	if err != nil {
		fmt.Printf("Error reading file %s: %v\n", *inputFile, err)
		os.Exit(1)
	}

	// Parse JSON into a slice of StreamingEvent
	var events []StreamingEvent
	if err := json.Unmarshal(data, &events); err != nil {
		fmt.Printf("Error parsing JSON: %v\n", err)
		os.Exit(1)
	}

	// Group by album
	albumMap := make(map[string]map[string]int)
	albumCount := make(map[string]int)
	albumArtist := make(map[string]string)

	for _, event := range events {
		// Skip entries without album or track names
		if event.AlbumName == "" || event.TrackName == "" {
			continue
		}

		if _, ok := albumMap[event.AlbumName]; !ok {
			albumMap[event.AlbumName] = make(map[string]int)
		}
		albumMap[event.AlbumName][event.TrackName]++
		albumCount[event.AlbumName]++

		// Store artist name for the album
		if event.ArtistName != "" {
			albumArtist[event.AlbumName] = event.ArtistName
		}
	}

	// Create a slice of AlbumStats for sorting
	var albums []AlbumStats
	for albumName, songs := range albumMap {
		// Create search URLs
		query := url.QueryEscape(albumArtist[albumName] + " " + albumName)
		musicBrainzURL := fmt.Sprintf("https://musicbrainz.org/search?query=%s&type=release&limit=25&method=indexed", query)

		artistQuery := url.QueryEscape(albumArtist[albumName])
		albumQuery := url.QueryEscape(albumName)
		medimopsArtistURL := fmt.Sprintf("https://www.medimops.de/produkte-C0/?fcIsSearch=1&searchparam=%s", artistQuery)
		medimopsAlbumURL := fmt.Sprintf("https://www.medimops.de/produkte-C0/?fcIsSearch=1&searchparam=%s", albumQuery)

		albums = append(albums, AlbumStats{
			Name:              albumName,
			Artist:            albumArtist[albumName],
			Plays:             albumCount[albumName],
			Songs:             songs,
			MusicBrainzURL:    musicBrainzURL,
			MedimopsArtistURL: medimopsArtistURL,
			MedimopsAlbumURL:  medimopsAlbumURL,
		})
	}

	// Sort by number of plays (descending)
	sort.Slice(albums, func(i, j int) bool {
		return albums[i].Plays > albums[j].Plays
	})

	// Limit to top X albums
	if *topLimit > 0 && len(albums) > *topLimit {
		albums = albums[:*topLimit]
	}

	// Determine output writer
	var writer io.Writer
	if *outputFile != "" {
		file, err := os.Create(*outputFile)
		if err != nil {
			fmt.Printf("Error creating output file %s: %v\n", *outputFile, err)
			os.Exit(1)
		}
		defer file.Close()
		writer = file
	} else {
		writer = os.Stdout
	}

	// Output based on format
	if *jsonOutput {
		generateJSONReport(albums, writer)
	} else {
		generateMarkdownReport(albums, writer)
	}
}

func generateJSONReport(albums []AlbumStats, writer io.Writer) {
	// Create JSON output structure
	output := struct {
		Summary struct {
			TotalAlbums int    `json:"total_albums"`
			GeneratedAt string `json:"generated_at"`
		} `json:"summary"`
		Albums []AlbumStats `json:"albums"`
	}{
		Albums: albums,
	}
	output.Summary.TotalAlbums = len(albums)
	output.Summary.GeneratedAt = "2025-08-28" // You could use time.Now() here

	// Marshal to JSON with pretty printing
	jsonData, err := json.MarshalIndent(output, "", "  ")
	if err != nil {
		fmt.Printf("Error marshaling JSON: %v\n", err)
		return
	}

	// Write to writer
	_, err = writer.Write(jsonData)
	if err != nil {
		fmt.Printf("Error writing JSON: %v\n", err)
		return
	}

	// If writing to stdout, don't show success message (it would interfere)
	if writer != os.Stdout {
		fmt.Printf("✅ JSON analysis complete!\n")
		fmt.Printf("📊 Found %d albums in structured format\n", len(albums))
	}
}

func generateMarkdownReport(albums []AlbumStats, writer io.Writer) {
	const markdownTemplate = `# Spotify Export Analysis - Albums Worth Buying

## Summary
- **Total Albums Analyzed**: {{.Total}}
- **Albums ranked by play count**:

## Top Albums

| Rank | Album | Artist | Plays | Search Links |
|:------|:------|:--------|-------|--------------|
{{range $index, $album := .Albums}}| {{add $index 1}} | {{$album.Name}} | {{$album.Artist}} | {{$album.Plays}} | [MusicBrainz]({{$album.MusicBrainzURL}}) • [Medimops Artist]({{$album.MedimopsArtistURL}}) • [Medimops Album]({{$album.MedimopsAlbumURL}}) |
{{end}}

## Detailed Breakdown

{{range $index, $album := .Albums}}
### {{add $index 1}}. {{$album.Name}} by {{$album.Artist}}
**Total Plays: {{$album.Plays}}**

**Where to buy:**
- [Search MusicBrainz]({{$album.MusicBrainzURL}}) for official release info
- [Search Medimops for artist]({{$album.MedimopsArtistURL}}) 
- [Search Medimops for album]({{$album.MedimopsAlbumURL}})

| Song | Plays |
|:------|:------|
{{range $song := sortSongs $album.Songs}}| {{$song.Name}} | {{$song.Plays}} |
{{end}}

{{end}}
`

	// Template functions
	funcMap := template.FuncMap{
		"add": func(a, b int) int {
			return a + b
		},
		"sortSongs": func(songs map[string]int) []SongPlay {
			var songList []SongPlay
			for song, plays := range songs {
				songList = append(songList, SongPlay{Name: song, Plays: plays})
			}
			sort.Slice(songList, func(i, j int) bool {
				return songList[i].Plays > songList[j].Plays
			})
			return songList
		},
	}

	// Parse and execute template
	tmpl, err := template.New("report").Funcs(funcMap).Parse(markdownTemplate)
	if err != nil {
		fmt.Printf("Error parsing template: %v\n", err)
		return
	}

	templateData := TemplateData{
		Albums: albums,
		Total:  len(albums),
	}

	err = tmpl.Execute(writer, templateData)
	if err != nil {
		fmt.Printf("Error executing template: %v\n", err)
		return
	}

	// If writing to stdout, don't show success message (it would interfere)
	if writer != os.Stdout {
		fmt.Printf("✅ Analysis complete!\n")
		fmt.Printf("📊 Found %d albums worth considering\n", len(albums))
	}
}
