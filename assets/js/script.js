/* Data */
const allNews = [
    {
        id: 1,
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Scoperta di una nuova specie di papera di gomma',
        tags: ['geo', 'tech'],
        author: 'Diana Rossi',
        published: '2023-02-01',
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

/* Create random rgba color */
const random_rgba = () => {
    const o = Math.round;
    const r = Math.random;
    const s = 255;

    return `rgba(${o(r()*s)}, ${o(r()*s)}, ${o(r()*s)}, 1)`;
}

/* Create text color based on background contrast */
const getTextColor = (rgba) =>{
    rgba = rgba.match(/\d+/g);
    const r = rgba[0];
    const g = rgba[1];
    const b = rgba[2];
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    return yiq >= 128 ? 'black' : 'white';
  }

/* Create array for all tags */
let allTags = [];
allNews.forEach(article => {
    article.tags.forEach(articleTag => {
        const backgroundColor = random_rgba()
        const color = getTextColor(backgroundColor);

        if (allTags.filter(tag => tag.name == articleTag).length == 0) {
            allTags.push({
                name: articleTag,
                color: color,
                backgroundColor: backgroundColor
            });
        }
    });
})

/* Stamp tags inside select */
allTags.forEach(tag => {
    const tagEl = `<option>${tag.name}</option>`
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
            const date = new Date(article.published);

            /* Format date */
            const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
            const year = date.getFullYear();
            const formatDate = `${day}/${month}/${year}`;

            /* Check if article is saved */
            if (savedNews.includes(article.id)) {
               icon = 'fa-solid';
            }

            /* Create article element */

            articleEl = `
                <div class="mt-4 p-4 article">
                    <div class="d-flex align-items-start mb-3">
                        <h2 class="m-0">${article.title}</h2>
                        <button type="button" data-article="${article.id}" class="article-bookmark btn btn-link"><i class="${icon} fa-bookmark fa-2xl"></i></button>
                    </div>
                    <div class="fw-bold">Pubblicato da ${article.author}</div>
                    <div class="fst-italic">In data ${formatDate}</div>
                    <div class="my-3">${article.content}</div>
                    <div class="mb-4 rounded overflow-hidden"><img src="./assets/images/${article.image}" alt="${article.title}"></div>
                    <div class="row gx-2">
            `;

            article.tags.forEach(articleTag => {
                const tag = allTags.filter(tag => tag.name == articleTag);
                const tagName = tag[0].name;
                const tagColor = tag[0].color;
                const tagBackgroundColor = tag[0].backgroundColor;

                articleEl += `<div class="col-auto"><div class="text-capitalize fw-normal fs-6 py-1 px-2 rounded overflow-hidden" style="background-color: ${tagBackgroundColor}; color: ${tagColor}">${tagName}</div></div>`
            });

            articleEl += '</div></div>';
    
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