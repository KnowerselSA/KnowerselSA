// =============================================
//  RESEARCH PREVIEW DATA
//  Add a new object per product
// =============================================

const PRODUCTS = {

    product_1: {
        // --- Product_details.html data ---
        pageTitle: "KnowerselSA — DORO",
        backLink: "product.html",
        name: "DORO",
        description: "A Quadruped Robot, or simply Robot Dog - is one of the advanced and versatile legged robotic solution available today. Designed for agility and efficiency, it excels at navigating complex environments where traditional wheeled or tracked robots fall short.",
        img: "src/assets/dog2.png",
        advantages: [
            "Handle Uneven Terrains",
            "Compact and Agile",
            "Payload Adaptable & Scalable",
            "Semi / Fully Autonomous capable",
            "Energy-efficient locomotion"
        ],
        applications: [
            "Industrial Inspection & 3D Mapping",
            "Security & Surveillance",
            "Search and Rescue",
            "Defense Forces",
            "Home Companion"
        ],

        // --- content.html (video swiper) data ---
        sectionHeading: "Research Preview",
        slides: [
            {
                title: "Title of the Video 1",
                description: "Description of the videos presenting the development.",
                type: "youtube",
                src: "https://www.youtube.com/embed/zBjJUV-lzHo?si=kuXoIw4uJkzPbnFW",
            },
            {
                title: "Title of the Video 2",
                description: "Description of the videos presenting the development.",
                type: "video",
                src: "",
            },
            {
                title: "Title of the Video 3",
                description: "Description of the videos presenting the development.",
                type: "video",
                src: "",
            },
            {
                title: "Title of the Video 4",
                description: "Description of the videos presenting the development.",
                type: "video",
                src: "",
            },
            {
                title: "Title of the Video 5",
                description: "Description of the videos presenting the development.",
                type: "video",
                src: "",
            },
        ],
    },

    product_2: {
        pageTitle: "KnowerselSA — Dualis",
        backLink: "product.html",
        name: "Dualis",
        description: "A Bimanual Manipulation or Dual Arm Robot - is a robotic system of two robotic arms working in coordination and synchronized motion to do and replicate tasks just like human hands.",
        img: "src/assets/Dualis-Page.png",
        // "para" type — renders as stacked labeled paragraphs instead of bullet lists
        advantages: {
            type: "para",
            label: "",
            text: "Performing human-hand tasks in both structured and unstructured environments. Offers efficient, dexterous object handling, with modular integration into robotic systems. Autonomous & also tele-operable."
        },
        applications: {
            type: "para",
            label: "Applicable Deployment",
            text: "Ideal for human-robot coworking, can be deployed in structured workspaces like Industrial automation and unstructured settings like home. Used for Lab assistance, Parts Assembly, packaging & etc."
        },
        sectionHeading: "",
        slides: [
            {
                title: "Title of the Video 1",
                description: "Description of the videos presenting the development.",
                type: "youtube",
                src: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
            },
        ],
    },

    // Add more products here...
};