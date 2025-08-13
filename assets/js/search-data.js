// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-legal-amp-privacy",
          title: "legal &amp; privacy",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/legal/";
          },
        },{id: "dropdown-publications",
              title: "publications",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/publications/";
              },
            },{id: "dropdown-cv",
              title: "cv",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/cv/";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/blog/";
              },
            },{id: "post-building-a-modern-audio-guide-platform-murnau-audio-guide-cloud",
        
          title: "Building a Modern Audio Guide Platform - murnau.audio-guide.cloud",
        
        description: "A deep dive into developing a multilingual audio guide platform using Go, Templ, and modern web technologies for the Schlossmuseum Murnau",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/murnau-audio-guide/";
          
        },
      },{id: "post-racing-thursdays-at-the-allianz-arena-my-munich-bike-stars-experience",
        
          title: "Racing Thursdays at the Allianz Arena - My Munich Bike Stars Experience",
        
        description: "A season of criterium racing at Munich&#39;s famous Donnerstagsrennen - from hobby racer to the hunt for the Munich Bike Stars title",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/munich-bike-stars-racing/";
          
        },
      },{id: "post-sans-london-april-2024",
        
          title: "SANS London April 2024",
        
        description: "SEC522 Application Security: Securing Web Apps, APIs, and Microservices",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/london-sec522/";
          
        },
      },{id: "post-simplifying-oauth-for-container-orchestration",
        
          title: "Simplifying OAuth for Container Orchestration",
        
        description: "Discussing a method for simplified oauth client authentication for orchestrated containerized microservices",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/ietf_wimse/";
          
        },
      },{id: "post-sans-offensive-operations-london-2023",
        
          title: "SANS Offensive Operations London 2023",
        
        description: "SEC575 Mobile Device Security and Ethical Hacking",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/london/";
          
        },
      },{id: "post-collabs-info-day",
        
          title: "Collabs Info Day",
        
        description: "Meeting cybersecurity experts from all around europe who collaborate with us in the eu projects",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/novi_sad/";
          
        },
      },{id: "post-certified-information-privacy-professional-europe-cipp-e",
        
          title: "Certified Information Privacy Professional/Europe (CIPP/E)",
        
        description: "Certification achieved from the International Association of Privacy Professionals",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/cippe/";
          
        },
      },{id: "post-2022-ieee-cybermatics-congress",
        
          title: "2022 IEEE Cybermatics Congress",
        
        description: "Publishing the new paper and visiting Helsinki",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/finland/";
          
        },
      },{id: "post-france",
        
          title: "France",
        
        description: "Traveling to the south of france and enjoying the sea, people and food.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/france/";
          
        },
      },{id: "news-came-back-from-brussels-smile-had-a-great-time-meeting-cyberscurity-experts-from-around-the-eu-during-the-convergencenext-event-looking-forward-to-working-with-them-in-the-future-i-also-wrote-a-quick-blog-about-the-conference",
          title: 'Came back from Brussels :smile:. Had a great time meeting Cyberscurity experts from...',
          description: "",
          section: "News",},{id: "news-just-came-back-from-france-beautiful-country-nice-people-and-great-food-heart-you-can-look-at-my-blog-for-some-beautiful-landscapes",
          title: 'Just came back from france. Beautiful country, nice people and great food :heart:....',
          description: "",
          section: "News",},{id: "news-just-came-back-from-helsinki-wink-had-an-awesome-time-presenting-my-paper-which-you-can-access-here-looking-forward-to-working-and-meeting-all-the-people-at-the-conference-again",
          title: 'Just came back from Helsinki :wink:. Had an awesome time presenting my paper...',
          description: "",
          section: "News",},{id: "news-i-m-happy-to-share-that-i-ve-earned-my-cipp-e-certification-from-the-iapp-it-s-a-step-forward-in-my-journey-to-promote-privacy-and-data-security",
          title: 'I’m happy to share that I’ve earned my CIPP/E certification from the IAPP....',
          description: "",
          section: "News",},{id: "news-just-came-back-from-the-collabs-info-day-in-novi-sad-serbia-finally-i-could-meed-the-people-we-are-collabrating-with-in-person-looking-forward-to-the-next-one",
          title: 'Just came back from the collabs info day in Novi Sad - Serbia....',
          description: "",
          section: "News",},{id: "news-i-ve-achieved-giac-mobile-device-security-analyst-gmob-certification-it-s-been-an-incredible-journey-of-learning-and-growth-in-the-field-of-cybersecurity",
          title: 'I’ve achieved GIAC Mobile Device Security Analyst (GMOB) certification! It’s been an incredible...',
          description: "",
          section: "News",},{id: "news-i-m-excited-to-share-an-ietf-draft-my-collegue-and-i-wrote-on-simplifying-oauth-2-0-for-container-orchestration-this-draft-shows-how-service-account-token-volume-projection-in-k8s-makes-client-authentciation-easier-and-more-secure-for-developers-if-your-interested-please-join-in-the-discussion-and-mail-us",
          title: 'I’m excited to share an IETF draft my collegue and I wrote on...',
          description: "",
          section: "News",},{id: "news-if-you-are-searching-for-a-fun-challenge-try-eksclustergames-com-its-a-little-ctf-from-wiz-io-for-learning-about-eks-security-i-did-it-with-two-collegues-and-it-was-great-fun",
          title: 'If you are searching for a fun challenge try eksclustergames.com. Its a little...',
          description: "",
          section: "News",},{id: "news-recently-i-took-part-in-the-kraken-hunter-workshop-it-was-great-fun-with-many-learnings-on-how-to-secure-workloads-in-the-cloud-containers-k8s-clusters-and-vms-and-in-the-end-we-were-kraken-hunters",
          title: 'Recently I took part in the Kraken Hunter Workshop It was great fun...',
          description: "",
          section: "News",},{id: "news-i-ve-achieved-the-giac-certified-web-application-defender-gweb-certification-together-with-the-sec522-training-its-a-really-interesting-learning-experience-great-hands-on-exercises-to-make-web-security-tangible",
          title: 'I’ve achieved the GIAC Certified Web Application Defender (GWEB) certification! Together with the...',
          description: "",
          section: "News",},{id: "news-the-summer-semester-at-tum-has-come-to-an-end-i-m-grateful-for-the-opportunity-to-teach-and-learn-from-the-students-now-we-embark-on-a-new-journey-in-the-winter-semester-at-hm-there-i-work-with-thomas-schreck-erwin-kupris-patrick-stoeckle-to-create-the-lecture-sicherheit-in-verteilten-systemen",
          title: 'The summer semester at TUM has come to an end. I’m grateful for...',
          description: "",
          section: "News",},{id: "news-currently-i-am-playing-with-cloud-run-on-gcp-awesome-service-however-using-volumes-is-a-pain-i-can-use-gcfuse-to-mount-buckets-to-the-file-system-so-far-so-good-however-it-cannot-be-used-for-concurrent-access-i-could-use-nfs-volumes-as-the-only-alternative-but-the-costs-start-at-200-month-alternative-provision-small-vm-and-start-nfs-so-i-need-a-vm-for-my-server-less-application",
          title: 'Currently I am playing with Cloud Run on GCP (Awesome service 🚀. However,...',
          description: "",
          section: "News",},{id: "news-already-missing-the-thursday-evening-criterium-races-at-the-allianz-arena-can-t-wait-for-next-season-️",
          title: 'Already missing the Thursday evening criterium races at the Allianz Arena. Can’t wait...',
          description: "",
          section: "News",},{id: "news-just-published-a-comprehensive-deep-dive-into-building-murnau-audio-guide-cloud-a-modern-multilingual-audio-guide-platform-for-museums-the-technical-write-up-covers-everything-from-go-templ-architecture-and-htmx-frontend-choices-to-ci-cd-automation-and-why-traditional-servers-often-beat-hyped-faas-solutions-for-simple-persistent-applications-️",
          title: 'Just published a comprehensive deep dive into building murnau.audio-guide.cloud - a modern multilingual...',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%68%6F%66%6D%61%6E%6E.%62%65%6E%65%64%69%6B%74.%68%62@%77%65%62.%64%65", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/b3n3d17", "_blank");
        },
      },{
        id: 'social-strava',
        title: 'Strava',
        section: 'Socials',
        handler: () => {
          window.open("https://www.strava.com/athletes/58152495", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
