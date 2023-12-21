/* Data */
const allNews = [
    {
        id: 1,
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Scoperta di una nuova specie di papera di gomma',
        tags: ['geo', 'tech'],
        author: 'Diana Rossi',
        published: '2023-02-11',
        image: 'rubber-duck.jpg',
    },
    {
        id: 2,
        title: 'Esplorando le profondità marine: il mistero degli abissi',
        content: 'Esplorando le profondità marine: il mistero degli abissi',
        tags: ['geo', 'viaggi'],
        author: 'Fabio Mari',
        published: '2023-03-14',
        image: 'deep-sea.jpg',
    },
    {
        id: 3,
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        tags: ['cucina'],
        author: 'Marta Bianchi',
        published: '2023-04-20',
        image: 'kitchen-food.jpg',
    },
    {
        id: 4,
        title: 'Arte moderna: oltre i confini convenzionali',
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
        tags: ['arte', 'tech'],
        author: 'Gabriele Neri',
        published: '2023-05-29',
        image: 'modern-art.jpg',
    }
]

/* Dom elements */
const newsEl = document.getElementById('news');
const selectEl = document.getElementById('select-tags');
const checkboxEl = document.getElementById('checkbox-saved-news');

/* Define variables */
const savedNews = [];

/* Create array for all tags */
let allTags = [];
allNews.forEach(article => {
    article.tags.forEach(articleTag => {   
        if (allTags.includes(articleTag) == false) {
            allTags.push(articleTag);
        }
    });
})

/* Stamp tags inside select */
allTags.forEach(tag => {
    const tagEl = `<option>${tag}</option>`
    selectEl.insertAdjacentHTML('beforeend', tagEl);
})

/* Stamp news */
const stampNews = (news) => {
    /* Delete all news */
    newsEl.innerHTML= '';

    /* Append news */
    if (news.length > 0) {
        news.forEach(article => {
            let articleEl;
            let icon = 'fa-regular';

            /* Check if article is saved */
            if (savedNews.includes(article.id)) {
               icon = 'fa-solid';
            }

            /* Create article element */
            articleEl = `
                <div class="mt-4 p-4 article">
                    <div class="d-flex align-items-start">
                        <h2>${article.title}</h2>
                        <button type="button" data-article="${article.id}" class="article-bookmark btn btn-link"><i class="${icon} fa-bookmark fa-2xl"></i></button>
                    </div>
                    <div class="fw-bold">Pubblicato da ${article.author}</div>
                    <div class="fst-italic">In data ${article.published}</div>
                    <div class="my-3">${article.content}</div>
                    <div class="mb-4 rounded overflow-hidden"><img src="./assets/images/${article.image}" alt="${article.title}"></div>
            `;

            article.tags.forEach(tag => {
                articleEl += `<div class="badge bg-primary fw-normal fs-6 me-1">${tag}</div>`
            });

            articleEl += '</div>';
    
            /* Stamp article */
            newsEl.insertAdjacentHTML('afterbegin', articleEl);
        })
    } else {
        newsEl.innerHTML= '<h3 class="text-white mt-4 text-center">Nessuna news disponibile</h3>';
    }

    /* Run save news */
    saveNews();
}

/* Save news */
const saveNews = () => {
    document.querySelectorAll('.article-bookmark').forEach(button => {
        button.addEventListener('click', () => {
            const articleId = button.dataset.article;

            if (savedNews.includes(articleId) == false) {
                savedNews.push(Number(articleId));
                button.innerHTML = '<i class="fa-solid fa-bookmark fa-2xl"></i>';
            }
        });
    })
};

/* Filter news */
const filterNews = () => {
    const selectValue = selectEl.value;
    const checkboxValue = checkboxEl.checked;
    let filteredNews;

    /* Filter news by select */
    if ( selectValue !== 'Tutti i tags') {
        filteredNews = allNews.filter(article => article.tags.includes(selectValue));
    } else {
        filteredNews = allNews;
    }
 
    /* Filter news by checkbox */
    if (checkboxValue) {
        filteredNews = filteredNews.filter(article => savedNews.includes(article.id));
    }

    /* Stamp news */
    stampNews(filteredNews);
};

/* Bind select event */
selectEl.addEventListener('change', () => {
    filterNews();
})

/* Bind checkbox event */
checkboxEl.addEventListener('change', () => {
    filterNews();
})

/* Init */
stampNews(allNews);