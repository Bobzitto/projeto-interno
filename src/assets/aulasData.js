const aulasData = [
  {
    id: 1,
    name: "Aula de Matemática",
    schoolYear: "1º ano",
    steps: 3,
    subject: "Matemática",
    public: true,
    content: "Conteúdo de álgebra e geometria.",
    distance: "Presencial",
    etapas: [
      {
        number: 1,
        type: "content",
        description: "Introdução à álgebra",
        contentType: "video",
        videoLink: "https://example.com/video1",
        textContent: ""
      },
      {
        number: 2,
        type: "exercise",
        description: "Exercícios de álgebra",
        exerciseType: "multiple choice",
        exercises: [
          {
            question: "Qual é o resultado de 2 + 2?",
            options: ["3", "4", "5"],
            answer: "4"
          }
        ]
      },
      {
        number: 3,
        type: "content",
        description: "Geometria básica",
        contentType: "text",
        videoLink: "",
        textContent: "Conteúdo sobre geometria básica."
      }
    ]
  },
  {
    id: 2,
    name: "Aula de Física",
    schoolYear: "3º ano do EM",
    steps: 5,
    subject: "Física",
    public: false,
    content: "Conteúdo sobre mecânica e termodinâmica.",
    distance: "Online",
    etapas: [
      {
        number: 1,
        type: "content",
        description: "Introdução à física",
        contentType: "video",
        videoLink: "https://example.com/video2",
        textContent: ""
      },
      {
        number: 2,
        type: "exercise",
        description: "Exercícios de mecânica",
        exerciseType: "true_false",
        exercises: [
          {
            question: "A força é medida em Newtons.",
            answer: "true"
          }
        ]
      },
      {
        number: 3,
        type: "content",
        description: "Termodinâmica básica",
        contentType: "text",
        videoLink: "",
        textContent: "Conteúdo sobre termodinâmica básica."
      },
      {
        number: 4,
        type: "exercise",
        description: "Exercícios de termodinâmica",
        exerciseType: "multiple_choice",
        exercises: [
          {
            question: "Qual é a unidade de medida da temperatura?",
            options: ["Kelvin", "Joule", "Newton"],
            answer: "Kelvin"
          }
        ]
      },
      {
        number: 5,
        type: "content",
        description: "Óptica básica",
        contentType: "video",
        videoLink: "https://example.com/video3",
        textContent: ""
      }
    ]
  },
  {
    id: 3,
    name: "Aula de Português",
    schoolYear: "2º ano",
    steps: 4,
    subject: "Português",
    public: true,
    content: "Conteúdo de gramática e literatura.",
    distance: "Presencial",
    etapas: [
      {
        number: 1,
        type: "content",
        description: "Introdução à gramática",
        contentType: "text",
        videoLink: "",
        textContent: "Conteúdo sobre gramática básica."
      },
      {
        number: 2,
        type: "exercise",
        description: "Exercícios de gramática",
        exerciseType: "dissertative",
        exercises: [
          {
            question: "Explique a diferença entre sujeito e predicado."
          }
        ]
      },
      {
        number: 3,
        type: "content",
        description: "Literatura brasileira",
        contentType: "video",
        videoLink: "https://example.com/video4",
        textContent: ""
      },
      {
        number: 4,
        type: "exercise",
        description: "Exercícios de literatura",
        exerciseType: "multiple_choice",
        exercises: [
          {
            question: "Quem escreveu 'Dom Casmurro'?",
            options: ["Machado de Assis", "José de Alencar", "Graciliano Ramos"],
            answer: "Machado de Assis"
          }
        ]
      }
    ]
  }
];

export default aulasData;