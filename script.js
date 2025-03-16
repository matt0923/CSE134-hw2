document.addEventListener("DOMContentLoaded", () => {
    const name = document.getElementById("name");
    const errorMessage = document.getElementById("error-message");
    const email = document.getElementById("email");
    const comments = document.getElementById("comments");
    const maxChars = 500;
    const charCount = document.getElementById("char-count")
    let form_errors = [];
    const formErrorsInput = document.getElementById("form-errors");
    const form = document.getElementById("contact");

    name.addEventListener("input", (event) => {
        const regex = /[A-Za-z\s]/;
        if (event.data && !regex.test(event.data)) {
            errorMessage.textContent = `Non-alphabetic character in name: "${event.data}"`;
            errorMessage.style.display = "block";
            errorMessage.style.opacity = "1";
            errorMessage.style.animation = "none";
            void errorMessage.offsetWidth;
            errorMessage.style.animation = "fadeOut 2s forwards";
            name.value = name.value.slice(0, -1);
            form_errors.push("Non-alphabetic character in name: " + event.data + " ");
        }
    });

    email.addEventListener("input", (event) => {
        const emailRegex = /[A-Za-z0-9@._-]/;
        if (event.data && !emailRegex.test(event.data)) {
            errorMessage.textContent = `Non-valid character in email: "${event.data}"`;
            errorMessage.style.display = "block";
            errorMessage.style.opacity = "1";
            errorMessage.style.animation = "none";
            void errorMessage.offsetWidth;
            errorMessage.style.animation = "fadeOut 4s forwards";
            email.value = email.value.slice(0, -1);
            form_errors.push("Non-valid character in email: " + event.data + " ");
        }
    });

    comments.addEventListener("input", (event) => {
        const currentLength = comments.value.length;
        const remaining = maxChars - currentLength;
        charCount.textContent = `${remaining} character(s) left`;
        
        if (remaining >= 200 && remaining <= 400) {
          charCount.style.color = "yellow";
        } else if (remaining < 200 && remaining >= 100) {
            charCount.style.color = "orange";
        }
        else if (remaining < 100) {
            charCount.style.color = "red";
        }
        else {
            charCount.style.color = "black";
        }
        if (comments.value.length > 500 && event.data) {
            charCount.textContent = "0 characters left";
            comments.value = comments.value.slice(0, -1);
            errorMessage.textContent = "Exceeded Character limit";
            errorMessage.style.display = "block";
            errorMessage.style.opacity = "1";
            errorMessage.style.animation = "none";
            void errorMessage.offsetWidth;
            errorMessage.style.animation = "fadeOut 2s forwards";
            form_errors.push("Exceeded Character limit");
        }
    });

    form.addEventListener("submit", () => {
        formErrorsInput.value = form_errors;
    });

    const toggle = document.getElementById("toggle");
    const root = document.documentElement; 

    toggle.addEventListener('change', function(event) {
        if (event.target.checked) {
            root.style.setProperty("--bg-color", "#1e1e1e");
            root.style.setProperty("--text-color", "white");
            root.style.setProperty("--primary-color", "white");
            root.style.setProperty("--hr-color", "white");
            localStorage.setItem("theme", "dark");
          } else {
            root.style.setProperty("--bg-color", "#ffffff");
            root.style.setProperty("--text-color", "black");
            root.style.setProperty("--primary-color", "black");
            root.style.setProperty("--hr-color", "black");
            localStorage.setItem("theme", "light");
          }
      });

    const theme = localStorage.getItem("theme");

    if (theme == "dark") {
        root.style.setProperty("--bg-color", "#1e1e1e");
        root.style.setProperty("--text-color", "white");
        root.style.setProperty("--primary-color", "white");
        toggle.checked = true;
    } else {
        root.style.setProperty("--bg-color", "#ffffff");
        root.style.setProperty("--text-color", "black");
        root.style.setProperty("--primary-color", "black");
        toggle.checked = false;
      }
});

class ArticleCard extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const title = this.getAttribute('title');
        const imgSrc = this.getAttribute('img-src');
        const imgAlt = this.getAttribute('img-alt');
        const description = this.getAttribute('description');
        const link = this.getAttribute('link');

        this.innerHTML = `
        <style>
            .card-container {
            display: grid;
            grid-template-columns: 1fr;
            max-width: 1000px;  
            margin: 0 auto;   
            transform: translateX(-2%);
            text-align: center;
            }
            picture img {
            background-size: cover; 
            background-repeat: no-repeat;
            background-position: center;
            display: block;
            height: 200px;
            width: 500px;
            box-shadow: 10px 5px 5px grey;
            margin-top: 4%;
            color: black;            
            }
            h2 {
            margin-top: 10%;
            margin-right: 50%;  
            }
            p#description {
            margin-left:60%;
            transform: translateY(-110%);
            }
            a#readMore {
            position: relative;
            top: -100px;
            color: var(--link-color, blue);
            margin-right: 50%;
            text-decoration: none;
            }
        </style>
        <div class="card-container">
            <h2>${title}</h2>
            <picture>
            <source srcset="${imgSrc}" type="image/jpeg">
            <img src="${imgSrc}" alt="${imgAlt}">
            </picture>
            <p id="description">${description}</p>
            <a href="${link}" target="_blank" id="readMore">Read More</a>
            <hr>
        </div>
        `;

  }
}

customElements.define('article-card', ArticleCard);

const sampleData = 
[
    {
    "title": "About Me", 
    "img-src": "giraffe.jpg", 
    "img-alt": "About me picture (of giraffe)", 
    "description": "My name is Matthew Williams, a software engineering major at the University of California, San Diego, where I am hoping to graduate by December. I will then look for a job to apply what I learned during my time here at UCSD, hopefully on a large project I am interested in/subject I am passionate about. The link below the image of my favorite animal (the Giraffe) should bring you to my linkedin to learn more about who I am professionally. ", 
    "link": "https://www.linkedin.com/in/matthew-williams-4337942b6/"
    },
    {
    "title": "Hobbies/Interests", 
    "img-src": "landscapewidemobile3x-stock-weights-169.jpg", 
    "img-alt": "Picture of weights", 
    "description": "As far as hobbies I enjoy outside of work/school, the first one that comes to mind would be weightlifting. I have been consistently weightlifting for upwards of 4 years meaning that I am not only developing my brain at school, but also having the discipline to develop my body at the same time. In addition to this, I enjoy cooking/baking as well as sewing and surfing, and spending time with my family and friends. The link below the dumbbells will take you to my school's website, to le", 
    "link": "https://ucsd.edu/"
    },
    {
    "title": "Featured Project", 
    "img-src": "ss.png", 
    "img-alt": "Screenshot of My Featured Project", 
    "description": "The project that I chose to feature is my group project from a class I took last year called Software Engineering. This project taught me quite a bit about HTML, CSS, and JavaScript, as well as Agile practices. I worked in a team setting to develop a journal for software engineers to write down what they did that day and included features like a password page complete with an encryption to make the journal feel safe, a calendar to mark important dates/track meetings, and markdown support to easily transfer the code you pushed to the journal. The link below brings you to the github repository of the project I described.", 
    "link": "https://github.com/cse110-sp24-group12/cse110-sp24-group12"
    }
]

localStorage.setItem('projects', JSON.stringify(sampleData));

  function createProjectCard(project) {
    const card = document.createElement('article-card');
    card.setAttribute('title', project.title);
    card.setAttribute('img-src', project["img-src"]);
    card.setAttribute('img-alt', project["img-alt"]);
    card.setAttribute('description', project.description);
    card.setAttribute('link', project.link);
    document.getElementById('cards-container').appendChild(card);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('loadLocal').addEventListener('click', function() {
      document.getElementById('cards-container').innerHTML = '';
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        projects.forEach(project => createProjectCard(project));
      } else {
        console.error('No local data found.');
      }
    });

    document.getElementById('loadRemote').addEventListener('click', function() {
      document.getElementById('cards-container').innerHTML = '';
      fetch('https://my-json-server.typicode.com/matt0923/134-data/db')
        .then(response => response.json())
        .then(data => {
            const projects2 = data.projects;
          projects2.forEach(project => createProjectCard(project));
        })
        .catch(error => console.error('Error fetching remote data:', error));
    });
    document.getElementById('btn-projects').addEventListener('click', function() {
        window.location.href = 'https://github.com/matt0923?tab=repositories';
      });
      
      document.getElementById('funny-joke').addEventListener('click', function() {
        window.location.href = 'https://blank.page/';
      });
      document.getElementById('btn-resume').addEventListener('click', function() {
        window.open('FakeResume.jpg', '_blank');
      });
  });