import type { Level } from './types';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const GRID_SIZE = 50;
export const SHIP_SIZE = 20;

const V1_COLOR = "rgba(52, 211, 153, 0.8)"; // Green
const V2_COLOR = "rgba(96, 165, 250, 0.8)"; // Blue
const V3_COLOR = "rgba(251, 146, 60, 0.8)"; // Orange
const V4_COLOR = "rgba(248, 113, 113, 0.8)"; // Red
const V5_COLOR = "rgba(168, 85, 247, 0.8)"; // Purple
const V_ROT_COLOR = "rgba(192, 132, 252, 0.8)"; // Lavender

export const LEVELS: Level[] = [
    // Fases de Tutorial
    {
        name: "Tutorial 1: O Primeiro Impulso",
        start: { x: -100, y: 0 },
        target: { x: 100, y: 0 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 200, y: 0, color: V1_COLOR },
        ],
        tutorial: [
            {
                title: "Bem-vindo, Comandante!",
                text: "Sua missão é pilotar a nave até o alvo. Para isso, você usará vetores. Vetores têm magnitude (comprimento) e direção.",
                highlightIds: [],
            },
            {
                title: "Planeje seu Voo",
                text: "Arraste a carta de vetor v₁ da 'Baía de Vetores' para o mapa espacial para planejar sua rota. Depois, pressione 'Lançar!' para mover.",
                highlightIds: ["v1"],
            }
        ]
    },
    {
        name: "Tutorial 2: Somando Forças",
        start: { x: -150, y: -50 },
        target: { x: 150, y: 50 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 300, y: 0, color: V1_COLOR },
            { id: "v2", label: "v₂", x: 0, y: 100, color: V2_COLOR },
        ],
        tutorial: [
            {
                title: "Adição de Vetores",
                text: "Para alcançar destinos que não estão em linha reta, você precisa somar vetores. O segundo vetor começará de onde o primeiro termina.",
                highlightIds: ["v1", "v2"],
            },
             {
                title: "Caminho Combinado",
                text: "Use v₁ para mover na horizontal e v₂ para mover na vertical. A ordem importa! Veja como a trajetória projetada muda.",
                highlightIds: ["v1", "v2"],
            }
        ]
    },
    {
        name: "Tutorial 3: Multiplicando o Poder",
        start: { x: -200, y: 0 },
        target: { x: 200, y: 0 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 0, color: V1_COLOR },
            { id: "v1-2x", label: "2v₁", x: 200, y: 0, color: V1_COLOR },
        ],
        tutorial: [
            {
                title: "Multiplicação por Escalar",
                text: "Multiplicar um vetor por um número (escalar) altera sua magnitude. O vetor '2v₁' tem a mesma direção que 'v₁', mas o dobro do comprimento.",
                highlightIds: ["v1", "v1-2x"],
            }
        ]
    },
    {
        name: "Tutorial 4: Corrigindo a Rota",
        start: { x: 0, y: 0 },
        target: { x: 100, y: 0 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 150, y: 0, color: V1_COLOR },
            { id: "v1-neg", label: "-v₂", x: -50, y: 0, color: V4_COLOR },
        ],
        tutorial: [
            {
                title: "Subtração de Vetores",
                text: "Um vetor negativo aponta na direção oposta. Use-o para corrigir um movimento que foi longe demais ou para se mover para trás.",
                highlightIds: ["v1", "v1-neg"],
            },
             {
                title: "Ajuste Fino",
                text: "Use v₁ para passar do alvo e, em seguida, use -v₂ para voltar e pousar exatamente no destino.",
                highlightIds: ["v1", "v1-neg"],
            }
        ]
    },

    // Fase 2: O Básico da Propulsão
    {
        name: "Fase 2 (Iniciante): Primeiros Passos",
        start: { x: -150, y: 0 },
        target: { x: 150, y: 0 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 0, color: V1_COLOR },
            { id: "v2", label: "v₂", x: 50, y: 0, color: V2_COLOR },
        ],
    },
    {
        name: "Fase 2 (Intermediário): Multiplicando a Força",
        start: { x: -200, y: 0 },
        target: { x: 200, y: 0 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 0, color: V1_COLOR },
            { id: "v1-2x", label: "2v₁", x: 200, y: 0, color: V1_COLOR },
        ],
    },
    {
        name: "Fase 2 (Avançado): Combinação Precisa",
        start: { x: -250, y: 0 },
        target: { x: 250, y: 0 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 150, y: 0, color: V1_COLOR },
            { id: "v2", label: "v₂", x: 100, y: 0, color: V2_COLOR },
            { id: "v3", label: "v₃", x: 50, y: 0, color: V3_COLOR },
        ],
    },
    // Fase 3: Manobras em Múltiplos Eixos
    {
        name: "Fase 3 (Iniciante): A Curva Simples",
        start: { x: -150, y: -100 },
        target: { x: 150, y: 100 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 300, y: 0, color: V1_COLOR },
            { id: "v2", label: "v₂", x: 0, y: 200, color: V2_COLOR },
        ],
    },
    {
        name: "Fase 3 (Intermediário): O Atalho Diagonal",
        start: { x: -150, y: -100 },
        target: { x: 150, y: 100 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 150, y: 100, color: V3_COLOR },
            { id: "v2", label: "v₂", x: 100, y: 0, color: V1_COLOR },
        ],
    },
    {
        name: "Fase 3 (Avançado): Zig-Zag",
        start: { x: -200, y: 100 },
        target: { x: 200, y: -100 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 200, y: 0, color: V1_COLOR },
            { id: "v2", label: "v₂", x: 0, y: -100, color: V2_COLOR },
            { id: "v3", label: "v₃", x: 100, y: -50, color: V3_COLOR },
        ],
    },
    // Fase 4: Navegando por Obstáculos
    {
        name: "Fase 4 (Iniciante): Desvio Amplo",
        start: { x: -200, y: 0 },
        target: { x: 200, y: 0 },
        obstacles: [{ x: 0, y: 0, radius: 50 }],
        availableVectors: [
            { id: "v1", label: "v₁", x: 200, y: 100, color: V3_COLOR },
            { id: "v2", label: "v₂", x: 200, y: -100, color: V3_COLOR },
        ],
    },
    {
        name: "Fase 4 (Intermediário): Contorno Próximo",
        start: { x: -200, y: 0 },
        target: { x: 200, y: 0 },
        obstacles: [{ x: 0, y: 0, radius: 70 }],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 100, color: V3_COLOR },
            { id: "v2", label: "v₂", x: 200, y: 0, color: V1_COLOR },
            { id: "v3", label: "v₃", x: 100, y: -100, color: V3_COLOR },
        ],
    },
    {
        name: "Fase 4 (Avançado): Campo de Asteroides",
        start: { x: -250, y: 0 },
        target: { x: 250, y: 0 },
        obstacles: [
            { x: 0, y: 60, radius: 40 },
            { x: 0, y: -60, radius: 40 },
        ],
        availableVectors: [
            { id: "v1", label: "v₁", x: 125, y: 0, color: V1_COLOR },
            { id: "v2", label: "v₂", x: 0, y: 120, color: V2_COLOR },
        ],
    },
    // Fase 5: Vetores Opostos e Correções
    {
        name: "Fase 5 (Iniciante): Um Passo Atrás",
        start: { x: 0, y: 0 },
        target: { x: 100, y: 0 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 150, y: 0, color: V1_COLOR },
            { id: "v1-neg", label: "-v₂", x: -50, y: 0, color: V4_COLOR },
        ],
    },
    {
        name: "Fase 5 (Intermediário): Manobra em U",
        start: { x: -100, y: -100 },
        target: { x: 100, y: -100 },
        obstacles: [{ x: 0, y: 0, radius: 80 }],
        availableVectors: [
            { id: "v1", label: "v₁", x: 0, y: 200, color: V2_COLOR },
            { id: "v2", label: "v₂", x: 200, y: 0, color: V1_COLOR },
            { id: "v3", label: "-v₁", x: 0, y: -200, color: V2_COLOR },
        ],
    },
    {
        name: "Fase 5 (Avançado): Ajuste Fino",
        start: { x: 0, y: 0 },
        target: { x: 50, y: 50 },
        obstacles: [{ x: 100, y: 0, radius: 40 }],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 0, color: V1_COLOR },
            { id: "v2", label: "v₂", x: -50, y: 50, color: V5_COLOR },
            { id: "v3", label: "v₃", x: 0, y: 50, color: V2_COLOR },
        ],
    },
    // Fase 6: O Poder da Multiplicação Escalar
    {
        name: "Fase 6 (Iniciante): Salto Longo",
        start: { x: -300, y: 0 },
        target: { x: 300, y: 0 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 150, y: 0, color: V1_COLOR },
            { id: "v1-2x", label: "2v₁", x: 300, y: 0, color: V1_COLOR },
        ],
    },
    {
        name: "Fase 6 (Intermediário): Toque Sutil",
        start: { x: 0, y: 0 },
        target: { x: 125, y: 0 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 0, color: V1_COLOR },
            { id: "v2", label: "0.5v₂", x: 50, y: 0, color: V2_COLOR },
            { id: "v3", label: "-0.5v₂", x: -50, y: 0, color: V4_COLOR },
        ],
    },
    {
        name: "Fase 6 (Avançado): Combinação Escalar",
        start: { x: -100, y: 150 },
        target: { x: 200, y: -150 },
        obstacles: [{ x: 50, y: 0, radius: 60 }],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: -100, color: V3_COLOR },
            { id: "v1-2x", label: "2v₁", x: 200, y: -200, color: V3_COLOR },
            { id: "v2-neg-half", label: "-0.5v₂", x: 50, y: 0, color: V4_COLOR },
        ],
    },
     // Fase 7: Passagens Estreitas
    {
        name: "Fase 7 (Iniciante): O Corredor",
        start: { x: -200, y: 0 },
        target: { x: 200, y: 0 },
        obstacles: [
            { x: 0, y: 100, radius: 80 },
            { x: 0, y: -100, radius: 80 },
        ],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 0, color: V1_COLOR },
        ],
    },
    {
        name: "Fase 7 (Intermediário): Buraco da Agulha",
        start: { x: -200, y: 0 },
        target: { x: 200, y: 0 },
        obstacles: [
            { x: 0, y: 50, radius: 45 },
            { x: 0, y: -50, radius: 45 },
        ],
        availableVectors: [
            { id: "v1", label: "v₁", x: 200, y: 0, color: V1_COLOR },
            { id: "v2", label: "v₂", x: 50, y: 10, color: V3_COLOR },
            { id: "v3", label: "v₃", x: 50, y: -10, color: V3_COLOR },
        ],
    },
    {
        name: "Fase 7 (Avançado): A Curva em S",
        start: { x: -250, y: -100 },
        target: { x: 250, y: 100 },
        obstacles: [
            { x: 0, y: -150, radius: 120 },
            { x: 0, y: 150, radius: 120 },
        ],
        availableVectors: [
            { id: "v1", label: "v₁", x: 125, y: 50, color: V3_COLOR },
            { id: "v2", label: "v₂", x: 0, y: 100, color: V2_COLOR },
        ],
    },
    // Fase 8: Composição de Vetores
    {
        name: "Fase 8 (Iniciante): Soma Diagonal",
        start: { x: 0, y: 0 },
        target: { x: 200, y: 0 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 100, color: V3_COLOR },
            { id: "v2", label: "v₂", x: 100, y: -100, color: V5_COLOR },
        ],
    },
    {
        name: "Fase 8 (Intermediário): Apenas Diagonais",
        start: { x: -150, y: -150 },
        target: { x: 150, y: 150 },
        obstacles: [{ x: 0, y: 0, radius: 50 }],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 50, color: V3_COLOR },
            { id: "v2", label: "v₂", x: 50, y: 100, color: V5_COLOR },
        ],
    },
    {
        name: "Fase 8 (Avançado): Rota Bloqueada",
        start: { x: -200, y: 0 },
        target: { x: 200, y: 0 },
        obstacles: [
            { x: 0, y: 0, radius: 80 },
            { x: 200, y: 100, radius: 60 },
        ],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 150, color: V2_COLOR },
            { id: "v2", label: "v₂", x: 150, y: -150, color: V3_COLOR },
            { id: "v3", label: "v₃", x: 150, y: 0, color: V1_COLOR },
        ],
    },
    // Fase 9: Manobras Orbitais
    {
        name: "Fase 9 (Iniciante): Órbita Simples",
        start: { x: -200, y: -150 },
        target: { x: 200, y: -150 },
        obstacles: [{ x: 0, y: 0, radius: 100 }],
        availableVectors: [
            { id: "v1", label: "v₁", x: 200, y: 150, color: V3_COLOR },
            { id: "v2", label: "v₂", x: 200, y: -150, color: V5_COLOR },
            { id: "v_rot_90", label: "Girar 90°", x: 0, y: 0, rotation: 90, color: V_ROT_COLOR },
            { id: "v_rot_neg_90", label: "Girar -90°", x: 0, y: 0, rotation: -90, color: V_ROT_COLOR },
        ],
    },
    {
        name: "Fase 9 (Intermediário): Órbita Fechada",
        start: { x: -200, y: -100 },
        target: { x: 200, y: -100 },
        obstacles: [{ x: 0, y: 0, radius: 80 }],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 100, color: V3_COLOR },
            { id: "v2", label: "v₂", x: 100, y: 0, color: V1_COLOR },
            { id: "v3", label: "v₃", x: 100, y: -100, color: V5_COLOR },
            { id: "v_rot_90", label: "Girar 90°", x: 0, y: 0, rotation: 90, color: V_ROT_COLOR },
            { id: "v_rot_neg_90", label: "Girar -90°", x: 0, y: 0, rotation: -90, color: V_ROT_COLOR },
        ],
    },
    {
        name: "Fase 9 (Avançado): O Oito",
        start: { x: -250, y: 0 },
        target: { x: 250, y: 0 },
        obstacles: [
            { x: 0, y: 120, radius: 80 },
            { x: 0, y: -120, radius: 80 },
        ],
        availableVectors: [
            { id: "v1", label: "v₁", x: 250, y: 120, color: V3_COLOR },
            { id: "v2", label: "v₂", x: 0, y: -240, color: V2_COLOR },
            { id: "v3", label: "v₃", x: 250, y: 120, color: V5_COLOR },
            { id: "v_rot_90", label: "Girar 90°", x: 0, y: 0, rotation: 90, color: V_ROT_COLOR },
            { id: "v_rot_neg_90", label: "Girar -90°", x: 0, y: 0, rotation: -90, color: V_ROT_COLOR },
        ],
    },
    // Fase 10: Viagens de Ida e Volta
    {
        name: "Fase 10 (Iniciante): Patrulha",
        start: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
        obstacles: [],
        availableVectors: [
            { id: "v1", label: "v₁", x: 200, y: 0, color: V1_COLOR },
            { id: "v1-neg", label: "-v₁", x: -200, y: 0, color: V4_COLOR },
            { id: "v2", label: "v₂", x: 100, y: 100, color: V3_COLOR },
        ],
    },
    {
        name: "Fase 10 (Intermediário): Circuito com Obstáculo",
        start: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
        obstacles: [{ x: 200, y: 0, radius: 50 }],
        availableVectors: [
            { id: "v1", label: "v₁", x: 200, y: 100, color: V3_COLOR },
            { id: "v2", label: "v₂", x: 0, y: -200, color: V2_COLOR },
            { id: "v3", label: "v₃", x: -200, y: 100, color: V5_COLOR },
        ],
    },
    {
        name: "Fase 10 (Avançado): Laço Complexo",
        start: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
        obstacles: [
            { x: 150, y: 150, radius: 60 },
            { x: -150, y: -150, radius: 60 },
        ],
        availableVectors: [
            { id: "v1", label: "v₁", x: 150, y: -150, color: V3_COLOR },
            { id: "v2", label: "-v₁", x: -150, y: 150, color: V5_COLOR },
            { id: "v3", label: "v₃", x: 100, y: 100, color: V1_COLOR },
        ],
    },
    // Fase 11: O Labirinto Vetorial
    {
        name: "Fase 11 (Iniciante): Corredor Inicial",
        start: { x: -250, y: -200 },
        target: { x: 250, y: 200 },
        obstacles: [
            { x: 0, y: -200, radius: 100 },
            { x: 0, y: 200, radius: 100 },
        ],
        availableVectors: [
            { id: "v1", label: "v₁", x: 250, y: 0, color: V1_COLOR },
            { id: "v2", label: "v₂", x: 0, y: 400, color: V2_COLOR },
        ],
    },
    {
        name: "Fase 11 (Intermediário): Becos e Saídas",
        start: { x: -250, y: -200 },
        target: { x: 250, y: 200 },
        obstacles: [
            { x: 0, y: -50, radius: 120 },
            { x: 0, y: 200, radius: 80 },
            { x: -150, y: 200, radius: 80 },
        ],
        availableVectors: [
            { id: "v1", label: "v₁", x: 100, y: 0, color: V1_COLOR },
            { id: "v2", label: "v₂", x: 0, y: 100, color: V2_COLOR },
            { id: "v3", label: "v₃", x: 50, y: 50, color: V3_COLOR },
        ],
    },
    {
        name: "Fase 11 (Avançado): O Desafio Final",
        start: { x: -300, y: -200 },
        target: { x: 300, y: 200 },
        obstacles: [
            { x: -150, y: -100, radius: 100 },
            { x: 150, y: 100, radius: 100 },
            { x: 0, y: 0, radius: 80 },
            { x: 0, y: -200, radius: 80 },
            { x: 0, y: 200, radius: 80 },
        ],
        availableVectors: [
            { id: "v1", label: "v₁", x: 150, y: 0, color: V1_COLOR },
            { id: "v2", label: "v₂", x: 0, y: 100, color: V2_COLOR },
            { id: "v3", label: "v₃", x: -100, y: 100, color: V5_COLOR },
            { id: "v4", label: "-v₂", x: 0, y: -100, color: V4_COLOR },
        ],
    },
];