
// ==========================================
// Course Search & Filter System
// ==========================================

// 1. Course Data
const courses = [
    {
        title: "Introduction to Web Development",
        category: "Web Development",
        description: "Learn HTML, CSS, and JavaScript to build your first responsive website.",
        level: "Beginner",
        duration: "4 Weeks",
        image: "images/course-web.jpg"
    },
    {
        title: "Advanced Web Design",
        category: "Web Development",
        description: "Explore modern web design principles and create beautiful user interfaces.",
        level: "Advanced",
        duration: "8 Weeks",
        image: "images/course-design.jpg"
    },
    {
        title: "Frontend Web Development",
        category: "Web Development",
        description: "Master frontend development and build interactive websites with JavaScript.",
        level: "Intermediate",
        duration: "6 Weeks",
        image: "images/course-frontend.jpg"
    },
    {
        title: "Python Programming Fundamentals",
        category: "Programming",
        description: "Start your programming journey with Python and learn essential coding concepts.",
        level: "Beginner",
        duration: "6 Weeks",
        image: "images/course-python.jpg"
    },
    {
        title: "Advanced Java Programming",
        category: "Programming",
        description: "Develop advanced Java programming skills and understand object-oriented programming.",
        level: "Advanced",
        duration: "10 Weeks",
        image: "images/course-java.jpg"
    },
    {
        title: "Creative Graphic Design",
        category: "Graphic Design",
        description: "Learn creative design techniques, typography, layouts, and visual communication.",
        level: "Beginner",
        duration: "5 Weeks",
        image: "images/course-graphic.jpg"
    },
    {
        title: "UI/UX Design Masterclass",
        category: "Graphic Design",
        description: "Discover user experience principles and create user-friendly digital designs.",
        level: "Intermediate",
        duration: "7 Weeks",
        image: "images/course-uiux.jpg"
    },
    {
        title: "Digital Marketing Essentials",
        category: "Digital Marketing",
        description: "Understand social media marketing, online campaigns, and digital brand growth.",
        level: "Beginner",
        duration: "4 Weeks",
        image: "images/course-marketing.jpg"
    },
    {
        title: "Advanced SEO and Content Strategy",
        category: "Digital Marketing",
        description: "Learn keyword research, SEO analytics, and effective content optimization strategies.",
        level: "Advanced",
        duration: "8 Weeks",
        image: "images/course-seo.jpg"
    },
    {
        title: "Introduction to Data Science",
        category: "Data Science",
        description: "Explore data analysis, visualization, and the fundamentals of data science.",
        level: "Beginner",
        duration: "6 Weeks",
        image: "images/course-data.jpg"
    }
];


// 2. DOM Elements
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const levelFilter = document.getElementById("levelFilter");
const clearFiltersButton = document.getElementById("clearFilters");
const courseContainer = document.getElementById("courseContainer");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");
const emptyResetButton = document.getElementById("emptyResetButton");


// 3. Display Courses Dynamically
function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    resultsCount.textContent = `Showing ${courseList.length} courses`;

    if (courseList.length === 0) {
        noResults.classList.remove("hidden");
        return;
    }

    noResults.classList.add("hidden");

    courseList.forEach((course, index) => {
        const courseCard = document.createElement("article");

        courseCard.className = "course-card";
        courseCard.style.animationDelay = `${index * 0.07}s`;

        courseCard.innerHTML = `
            <div class="course-image-wrapper">
                <img
                    src="${course.image}"
                    alt="${course.title}"
                    class="course-image"
                    loading="lazy"
                >
                <span class="course-category">${course.category}</span>
            </div>

            <div class="course-content">
                <div class="course-meta">
                    <span class="course-level">${course.level}</span>
                    <span class="course-duration">${course.duration}</span>
                </div>

                <h3 class="course-title"></h3>
                <p class="course-description"></p>

                <div class="course-card-footer">
                    <span class="course-label">Explore your potential</span>
                    <span class="course-arrow">↗</span>
                </div>
            </div>
        `;

        // Insert course text safely
        courseCard.querySelector(".course-title").textContent = course.title;
        courseCard.querySelector(".course-description").textContent = course.description;

        // Handle missing images
        const courseImage = courseCard.querySelector(".course-image");

        courseImage.addEventListener("error", function () {
            this.style.display = "none";
            this.parentElement.classList.add("image-fallback");
        }, { once: true });

        courseContainer.appendChild(courseCard);
    });
}


// 4. Search Courses by Title
function searchCourses() {
    const searchText = searchInput.value.toLowerCase().trim();

    return courses.filter(course =>
        course.title.toLowerCase().includes(searchText)
    );
}


// 5. Apply Combined Filters
function filterCourses() {
    let filteredCourses = searchCourses();

    const selectedCategory = categoryFilter.value;
    const selectedLevel = levelFilter.value;

    if (selectedCategory !== "All Categories") {
        filteredCourses = filteredCourses.filter(course =>
            course.category === selectedCategory
        );
    }

    if (selectedLevel !== "All Levels") {
        filteredCourses = filteredCourses.filter(course =>
            course.level === selectedLevel
        );
    }

    displayCourses(filteredCourses);
}


// 6. Clear All Filters
function clearFilters() {
    searchInput.value = "";
    categoryFilter.value = "All Categories";
    levelFilter.value = "All Levels";

    displayCourses(courses);
}


// 7. Event Listeners
searchInput.addEventListener("input", filterCourses);

categoryFilter.addEventListener("change", filterCourses);

levelFilter.addEventListener("change", filterCourses);

clearFiltersButton.addEventListener("click", clearFilters);

emptyResetButton.addEventListener("click", clearFilters);


// 8. Display All Courses on Page Load
displayCourses(courses);
