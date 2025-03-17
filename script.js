
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

  // Transition de sortie
  questionElement.classList.add("slide-out");
  optionsContainer.classList.add("slide-out");

  // Attendre la fin de la transition pour charger la nouvelle question
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

    // Transition d'entrée
    questionElement.classList.remove("slide-out");
    optionsContainer.classList.remove("slide-out");
    questionElement.classList.add("slide-in");
    optionsContainer.classList.add("slide-in");

    // Réinitialiser les classes après la transition
    setTimeout(() => {
      questionElement.classList.remove("slide-in");
      optionsContainer.classList.remove("slide-in");
    }, 600);
  }, 600);
}

function validateAnswer() {
  const selectedOption = document.querySelector("input[name='quiz']:checked");
  if (selectedOption) {
    const reponse = selectedOption.value;
    // Récupérer l'élément label parent pour appliquer la couleur
    const label = selectedOption.parentElement;
    if (reponse === questions[currentQuestionIndex].answer) {
      label.classList.add("correct");
    } else {
      label.classList.add("incorrect");
    }

    // Enregistrer la réponse de l'utilisateur
    reponsesUtilisateur.push({
      question: questions[currentQuestionIndex].question,
      reponseUtilisateur: reponse,
      bonneReponse: questions[currentQuestionIndex].answer
    });

    if (reponse === questions[currentQuestionIndex].answer) {
      bonnesReponses++;
    }

    // Attendre 1 seconde pour laisser le temps à l'utilisateur de voir la correction
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
      } else {
        afficherResultats();
      }
    }, 1000);
  }
}

function afficherResultats() {
  const quizContainer = document.querySelector(".quiz-container");
  quizContainer.innerHTML = `
    <h2>Résultats</h2>
    <p>Vous avez obtenu ${bonnesReponses} bonne(s) réponse(s) sur ${questions.length}.</p>
    <div id="resultsCarousel">
      <button id="prev" class="arrow">&#9664;</button>
      <div id="slideContainer"></div>
      <button id="next" class="arrow">&#9654;</button>
    </div>
  `;

  // Création des slides pour chaque réponse
  const slideContainer = document.getElementById("slideContainer");
  reponsesUtilisateur.forEach((reponse, index) => {
    // Détermine si la réponse est correcte
    const estCorrecte = reponse.reponseUtilisateur === reponse.bonneReponse;
    const slide = document.createElement("div");
    slide.classList.add("result-slide");
    // On affiche seulement la première slide par défaut
    if (index === 0) slide.classList.add("active");
    
    slide.innerHTML = `
      <h3>Question ${index + 1}</h3>
      <p>${reponse.question}</p>
      <p>Votre réponse : <span class="result" style="color: ${estCorrecte ? 'green' : 'red'};">
        ${estCorrecte ? 'Vrai' : 'Fausse'}
      </span></p>
      <p>${estCorrecte ? "" : "Bonne réponse : " + reponse.bonneReponse}</p>
    `;
    slideContainer.appendChild(slide);
  });

  let currentSlide = 0;
  const slides = document.querySelectorAll(".result-slide");
  
  // Fonction pour afficher la slide souhaitée
  function showSlide(index) {
    if (index < 0 || index >= slides.length) return;
    slides[currentSlide].classList.remove("active");
    currentSlide = index;
    slides[currentSlide].classList.add("active");
  }
  
  // Gestion des boutons de navigation
  document.getElementById("prev").addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });
  document.getElementById("next").addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });
}


document.addEventListener("DOMContentLoaded", loadQuestion);
