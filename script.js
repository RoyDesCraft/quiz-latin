const questions = [
    { question: "Quelle est la signification de 'salve' en latin ?", options: ["porte-toi bien", "bonjour", "au revoir", "salut"], answer: "porte-toi bien" },
    { question: "Quelle est la signification de 'dominus' en latin ?", options: ["esclave", "maître de maison", "prêtre", "chef"], answer: "maître de maison" },
    { question: "Quelle est la signification de 'genius' en latin ?", options: ["dieu", "le génie", "l'esprit", "le maître"], answer: "le génie" },
    { question: "Quelle est la signification de 'historia' en latin ?", options: ["histoire", "légende", "poésie", "chant"], answer: "histoire" },
    { question: "Quelle est la signification de 'eligere' en latin ?", options: ["choisir", "écrire", "chanter", "travailler"], answer: "choisir" },
    { question: "Quelle est la signification de 'nihil' en latin ?", options: ["tout", "rien", "quelque chose", "néant"], answer: "rien" },
    { question: "Quelle est la signification de 'vir' en latin ?", options: ["femme", "enfant", "homme", "guerrier"], answer: "homme" },
    { question: "Quelle est la signification de 'poeta' en latin ?", options: ["musicien", "poète", "acteur", "peintre"], answer: "poète" },
    { question: "Quelle est la signification de 'antiquus' en latin ?", options: ["nouveau", "antique", "moderne", "usé"], answer: "antique" },
    { question: "Quelle est la signification de 'mare' en latin ?", options: ["rivière", "lac", "mer", "océan"], answer: "mer" },
    { question: "Quelle est la signification de 'canis' en latin ?", options: ["chat", "chien", "loup", "singe"], answer: "chien" },
    { question: "Quelle est la signification de 'felis' en latin ?", options: ["tigre", "chat", "panthère", "chien"], answer: "chat" },
    { question: "Quelle est la signification de 'terra' en latin ?", options: ["ciel", "terre", "eau", "feu"], answer: "terre" },
    { question: "Quelle est la signification de 'gens' en latin ?", options: ["famille", "roi", "tribu", "soldat"], answer: "famille" },
    { question: "Quelle est la signification de 'niger' en latin ?", options: ["blanc", "noir", "rouge", "bleu"], answer: "noir" }
];

let currentQuestionIndex = 0;
let bonnesReponses = 0;
let reponsesUtilisateur = [];

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");

    // Appliquez la transition de sortie à la question et aux options actuelles
    questionElement.classList.add("slide-out");
    optionsContainer.classList.add("slide-out");

    // Attendez la fin de la transition avant de charger la nouvelle question
    setTimeout(() => {
        questionElement.textContent = questions[currentQuestionIndex].question;
        optionsContainer.innerHTML = "";

        questions[currentQuestionIndex].options.forEach(option => {
            const label = document.createElement("label");
            label.classList.add("option");

            const input = document.createElement("input");
            input.type = "radio";
            input.name = "quiz";
            input.value = option;

            label.appendChild(input);
            label.appendChild(document.createTextNode(" " + option));
            optionsContainer.appendChild(label);
        });

        // Appliquez la transition de nouvelle entrée
        questionElement.classList.remove("slide-out");
        optionsContainer.classList.remove("slide-out");
        questionElement.classList.add("slide-in");
        optionsContainer.classList.add("slide-in");

        // Réinitialisez les classes après un délai pour permettre la prochaine transition
        setTimeout(() => {
            questionElement.classList.remove("slide-in");
            optionsContainer.classList.remove("slide-in");
        }, 600); // Temps pour la transition d'entrée
    }, 600); // Temps pour la transition de sortie
}

function validateAnswer() {
    const selectedOption = document.querySelector("input[name='quiz']:checked");
    if (selectedOption) {
        const reponse = selectedOption.value;
        reponsesUtilisateur.push({
            question: questions[currentQuestionIndex].question,
            reponseUtilisateur: reponse,
            bonneReponse: questions[currentQuestionIndex].answer
        });

        if (reponse === questions[currentQuestionIndex].answer) {
            bonnesReponses++;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            afficherResultats();
        }
    }
}

function afficherResultats() {
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.innerHTML = `<h2>Résultats</h2><p>Vous avez obtenu ${bonnesReponses} bonne(s) réponse(s) sur ${questions.length}.</p>`;

    const resultsTable = document.createElement("table");
    resultsTable.border = "1";
    resultsTable.innerHTML = `
        <tr>
            <th>Question</th>
            <th>Votre Réponse</th>
            <th>Bonne Réponse</th>
        </tr>
    `;

    reponsesUtilisateur.forEach(reponse => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${reponse.question}</td>
            <td>${reponse.reponseUtilisateur}</td>
            <td>${reponse.bonneReponse}</td>
        `;
        resultsTable.appendChild(row);
    });

    quizContainer.appendChild(resultsTable);
}

document.addEventListener("DOMContentLoaded", loadQuestion);
document.addEventListener("DOMContentLoaded", loadQuestion);
