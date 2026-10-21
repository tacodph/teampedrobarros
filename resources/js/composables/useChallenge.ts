import { computed, onMounted, onUnmounted, ref } from 'vue';

export const INSTAGRAM_URL = 'https://www.instagram.com/pedrobarrosof/';

export const GOALS = [
    {
        key: 'treino',
        color: '#2CCBF2',
        metric: '45 min',
        title: 'Treino e movimento',
        desc: 'Qualquer modalidade. Pelo menos 2x por semana ao ar livre.',
        icon: '/images/goals/treino.webp',
    },
    {
        key: 'alimentacao',
        color: '#7EE0A3',
        metric: '3L de água',
        title: 'Alimentação e hidratação',
        desc: 'Sem álcool, fast food e doce industrializado. 1 refeição luxo por semana.',
        icon: '/images/goals/alimentacao.webp',
    },
    {
        key: 'oracao',
        color: '#7EB6FF',
        metric: '10 + 30 min',
        title: 'Fé e família',
        desc: 'Oração diária, missa ou culto semanal e família sem celular.',
        icon: '/images/goals/oracao.webp',
    },
    {
        key: 'habilidade',
        color: '#B8C4C9',
        metric: '15 min',
        title: 'Habilidade nova',
        desc: 'Escolha no dia 1, pratique todo dia, mostre no dia 60.',
        icon: '/images/goals/habilidade.webp',
    },
    {
        key: 'flexoes',
        color: '#2CCBF2',
        metric: '30 → 100',
        title: 'Flexões progressivas',
        desc: 'A meta sobe a cada 10 dias. 4.000 no total.',
        icon: '/images/goals/flexoes.webp',
    },
] as const;

const MILES = [
    { day: 1, date: '22 out', title: 'Começou.', line: 'Aquele momento em que você decide que quer ser melhor.' },
    { day: 15, date: '6 nov', title: 'Tá ficando real!', line: 'Olha o comprometimento. Olha a amizade ficando mais forte.' },
    { day: 30, date: '21 nov', title: 'Metade do caminho!', line: 'Isso não é sorte. Isso é disciplina. Isso é honra entre amigos.' },
    { day: 45, date: '6 dez', title: 'Reta final!', line: '15 dias pra virar regra. 15 dias pro verão.' },
    { day: 60, date: '20 dez', title: 'Conseguimos.', line: 'Próximo verão? Desafio de Verão de novo.' },
];

const START = new Date(2026, 9, 22, 0, 0, 0).getTime();
const END = new Date(2026, 11, 20, 23, 59, 59).getTime();

export function repsForDay(day: number): number {
    return [30, 45, 60, 75, 90, 100][Math.min(5, Math.floor((day - 1) / 10))];
}

function pad(value: number): string {
    return String(value).padStart(2, '0');
}

function currentDayAt(now: number): number {
    if (now < START || now > END) {
        return 0;
    }

    return Math.min(60, Math.floor((now - START) / 86400000) + 1);
}

function formatBrl(value: number): string {
    return (
        'R$ ' +
        value
            .toFixed(2)
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    );
}

export function useChallenge() {
    const now = ref(Date.now());
    const pushDay = ref(1);
    const fails = ref(0);
    let timer: ReturnType<typeof setInterval> | null = null;

    const today = computed(() => currentDayAt(now.value));

    const countdown = computed(() => {
        if (now.value < START) {
            let seconds = Math.floor((START - now.value) / 1000);
            const days = Math.floor(seconds / 86400);
            seconds -= days * 86400;
            const hours = Math.floor(seconds / 3600);
            seconds -= hours * 3600;
            const minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;

            return {
                label: 'Começa em',
                isCounting: true,
                isRunning: false,
                isDone: false,
                day: 0,
                pct: '0%',
                units: [
                    { v: pad(days), l: 'dias' },
                    { v: pad(hours), l: 'horas' },
                    { v: pad(minutes), l: 'min' },
                    { v: pad(seconds), l: 'seg' },
                ],
            };
        }

        if (now.value <= END) {
            const day = today.value;

            return {
                label: 'Em andamento',
                isCounting: false,
                isRunning: true,
                isDone: false,
                day,
                pct: `${(day / 60) * 100}%`,
                units: [],
            };
        }

        return {
            label: 'Desafio concluído',
            isCounting: false,
            isRunning: false,
            isDone: true,
            day: 60,
            pct: '100%',
            units: [],
        };
    });

    const pushReps = computed(() => repsForDay(pushDay.value));

    const bars = computed(() =>
        Array.from({ length: 60 }, (_, index) => {
            const day = index + 1;

            return {
                h: `${repsForDay(day)}%`,
                c: day === pushDay.value ? '#FFFFFF' : day < pushDay.value ? '#2CCBF2' : '#16333A',
            };
        }),
    );

    const failTotal = computed(() => formatBrl(fails.value * 10));

    const failNote = computed(() => {
        if (fails.value === 0) {
            return 'Nenhum dia perdido. Siga firme!';
        }

        if (fails.value === 60) {
            return 'Todos os dias viraram doação — e ainda assim, fez diferença.';
        }

        const label = fails.value === 1 ? 'dia' : 'dias';

        return `${fails.value} ${label} × R$ 10,00. No final, doa e faz diferença real.`;
    });

    const failDots = computed(() =>
        Array.from({ length: 60 }, (_, index) => ({
            c: index < fails.value ? '#2CCBF2' : '#16333A',
        })),
    );

    const milestones = computed(() => {
        const current = today.value;
        const nextIdx = now.value < START ? 0 : MILES.findIndex((mile) => mile.day >= current);

        return MILES.map((mile, index) => {
            const passed = now.value > END || (current > 0 && mile.day < current);
            const isNext = index === nextIdx && now.value <= END;

            return {
                ...mile,
                tag: isNext ? (current === mile.day ? 'Hoje' : 'Próximo') : passed ? 'Feito' : '',
                tagColor: isNext ? '#2CCBF2' : '#7EE0A3',
                bg: isNext ? '#0B0F11' : '#050708',
                border: isNext ? '#2CCBF2' : '#16333A',
                numColor: isNext || mile.day === 60 ? '#2CCBF2' : '#FFFFFF',
            };
        });
    });

    const earn = [
        { t: 'Dia completo (5 objetivos)', p: '+10' },
        { t: 'Semana perfeita (7/7 dias)', p: '+50' },
        { t: 'Primeira vez acertando algo novo', p: '+5' },
        { t: 'Motivar um amigo desanimado', p: '+5' },
    ];

    const incFail = () => {
        fails.value = Math.min(60, fails.value + 1);
    };

    const decFail = () => {
        fails.value = Math.max(0, fails.value - 1);
    };

    onMounted(() => {
        const day = currentDayAt(Date.now());
        if (day) {
            pushDay.value = day;
        }

        timer = setInterval(() => {
            now.value = Date.now();
        }, 1000);
    });

    onUnmounted(() => {
        if (timer) {
            clearInterval(timer);
        }
    });

    return {
        goals: GOALS,
        countdown,
        pushDay,
        pushReps,
        bars,
        fails,
        failTotal,
        failNote,
        failDots,
        incFail,
        decFail,
        earn,
        milestones,
        instagramUrl: INSTAGRAM_URL,
    };
}
