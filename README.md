# CivicPulse: Your AI-Powered Election Assistant

**CivicPulse** is an interactive web application designed to empower citizens by making the complex election process transparent, accessible, and easy to follow. Built for the Google Antigravity Challenge, it combines high-end modern design with the power of Google Gemini AI to provide real-time civic guidance.

## 🗳️ Chosen Vertical
**Election Process Assistant**: Helping users understand timelines, steps, and rules of the electoral cycle.

---

## 🚀 Approach & Logic

Our approach focuses on **reducing the cognitive load** of civic participation. We've broken down the election journey into three core interactive modules:

1.  **Interactive Timeline**: A dynamic visual representation of the election phases (Notification -> Results). Users can explore each phase to understand the legal and procedural requirements.
2.  **Voter's Journey Wizard**: A logical, step-by-step guide tailored for both new and existing voters, covering eligibility, registration, and polling day procedures.
3.  **AI Expert (Gemini)**: A real-time chat assistant that uses natural language processing to answer specific, nuanced questions about the election process that static guides might miss.

---

## 🛠️ How It Works

### Core Technologies
-   **Framework**: Next.js 14 (App Router) for high performance and SEO optimization.
-   **Styling**: Vanilla CSS Modules for premium, custom design without the constraints of generic frameworks.
-   **Animations**: Framer Motion for smooth, "premium" transitions and micro-interactions.
-   **Icons**: Lucide-react for a consistent, modern visual language.

### Google Services Integration
-   **Google Gemini (AI)**: Integrated via the **InsForge AI SDK**. It powers the "CivicPulse AI" assistant, providing context-aware answers about voting rules and procedures.
-   **Google Calendar**: A custom utility generates dynamic Google Calendar links, allowing users to "Sync to Calendar" key election deadlines and polling dates directly from the timeline.
-   **Google Fonts**: Utilizes **Inter** and **Outfit** for a professional and highly readable typography system.

### Design Aesthetic: "Modern Civic"
The UI follows a premium "Modern Civic" theme:
-   **Colors**: Deep Indigo and Crisp White for trust and clarity, with Energetic Gold accents.
-   **Glassmorphism**: Subtle frosted-glass effects on cards and the chat interface to create depth and a high-end feel.
-   **Responsive**: Fully optimized for mobile devices, ensuring voters can access information on the go.

---

## 💡 Assumptions Made

1.  **Region**: While the architecture is modular, the initial content is modeled after the **Indian General Election** process (one of the world's most complex) to demonstrate the assistant's ability to handle intricate steps.
2.  **Dates**: The dates provided in the timeline are illustrative placeholders for the 2026 cycle. In a production environment, these would be fetched from a live Election Commission API.
3.  **Authentication**: For this challenge, the AI Assistant is accessible without login to maximize ease of use for general citizens.

---

## 🛠️ Setup & Local Development

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/AbhiDECODE/CivicPulse.git
    cd CivicPulse
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env.local` file and add your InsForge API key:
    ```env
    INSFORGE_API_KEY=your_api_key_here
    ```

4.  **Run Locally**:
    ```bash
    npm run dev
    ```

---

*Built with ❤️ for the Google Antigravity Challenge.*
