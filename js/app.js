const KEYWORDS = {
    "Core ML": ["Regression", "Random Forest", "Clustering", "Deep Learning", "XGBoost", "Feature Engineering", "Statistics"],
    "Tools": ["Python", "Scikit-learn", "Pandas", "NumPy", "TensorFlow", "PyTorch", "Jupyter", "FastAPI"],
    "Cloud": ["AWS", "GCP", "Docker", "S3", "Lambda", "Deployment", "Kubernetes"],
    "DSA": ["Binary Search", "DFS", "BFS", "Dynamic Programming", "Big-O"]
};

const PROJECT_IDEAS = {
    "AWS": "Build a Serverless ML Inference Pipeline using Lambda and S3.",
    "Docker": "Containerize a Scikit-learn model and deploy it to a Cloud Run instance.",
    "Deep Learning": "Build a CNN for Image Classification or a Transformer for Text Summarization.",
    "FastAPI": "Create a high-performance REST API for your model using FastAPI and Pydantic.",
    "Dynamic Programming": "Build a visualizer for classic DP problems like Knapsack or Edit Distance."
};

function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
}

function analyze() {
    const resumeText = document.getElementById('resume').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    const chipContainer = document.getElementById('chip-container');
    const recommendationList = document.getElementById('recommendations');

    chipContainer.innerHTML = '';
    recommendationList.innerHTML = '';
    
    let missingKeywords = [];

    Object.entries(KEYWORDS).forEach(([category, list]) => {
        const catHeader = document.createElement('h3');
        catHeader.className = 'font-bold mt-4 mb-2 text-sm uppercase tracking-wider text-secondary';
        catHeader.textContent = category;
        chipContainer.appendChild(catHeader);

        const group = document.createElement('div');
        group.className = 'flex flex-wrap gap-2';

        list.forEach(kw => {
            const found = resumeText.includes(kw.toLowerCase());
            if (!found) missingKeywords.push(kw);

            const chip = document.createElement('span');
            chip.className = `chip ${found ? 'chip-found' : 'chip-missing'}`;
            chip.textContent = kw;
            group.appendChild(chip);
        });
        chipContainer.appendChild(group);
    });

    // Recommendations
    const uniqueRecs = new Set();
    missingKeywords.forEach(kw => {
        if (PROJECT_IDEAS[kw]) uniqueRecs.add(PROJECT_IDEAS[kw]);
    });

    if (uniqueRecs.size === 0) {
        uniqueRecs.add("Quantify your project results! E.g., 'Reduced latency by 20%' or 'Achieved 94% F1-score'.");
    }

    uniqueRecs.forEach(rec => {
        const li = document.createElement('li');
        li.className = 'mb-2 text-secondary';
        li.textContent = rec;
        recommendationList.appendChild(li);
    });

    resultsDiv.classList.remove('hidden');
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
}
