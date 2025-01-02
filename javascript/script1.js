const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let listItemDom = document.querySelector('.carousel .list');
let thumbnailDom = document.querySelector('.carousel .thumbnail');

menuIcon.addEventListener("click", () => {
    menuList.classList.toggle("hidden")
});

nextDom.onclick = function(){
    showSlider('next');
}

prevDom.onclick = function(){
    showSlider('prev');
}
let timeRunning = 3000;
let timeAutoNext = 7000;
let runTimedOut;
let runAutoRun = setTimeout(()=>{
        nextDom.click();
    }, timeAutoNext);
function showSlider(type){
    let itemSlider = document.querySelectorAll('.carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

    if(type === 'next'){
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carouselDom.classList.add('next');
    }else{
        let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumbnail[positionLastItem]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimedOut);
    runTimedOut = setTimeout(() =>{
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runAutoRun);
}

document.getElementById("year").textContent = new Date().getFullYear();

function smoothScroll(event, sectionID) {
    event.preventDefault(); // Mencegah aksi default
    const target = document.getElementById(sectionID);
    
    // Scroll dengan transisi yang halus
    target.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });

    // Pastikan scroll tidak terhalang di bagian bawah
    if (sectionID === 'home') {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

// Ambil semua gambar di dalam galeri
const images = document.querySelectorAll('.gallery .item img');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

// Menambahkan event listener untuk setiap gambar
images.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block'; // Tampilkan modal
        modalImg.src = img.src; // Set gambar besar ke modal
        caption.innerHTML = img.alt; // Set caption di bawah gambar
    });
});

// Menutup modal saat tombol close diklik
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // Sembunyikan modal
});

// Menutup modal jika klik di luar gambar
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

let comments = JSON.parse(localStorage.getItem('comments')) || []; // Load existing comments

// Generate random avatar URL
function getRandomAvatar() {
    const randomString = Math.random().toString(36).substring(2, 10); // Random string
    return `https://api.dicebear.com/6.x/bottts/svg?seed=${randomString}`; // DiceBear Avatar URL
}

// Render comments
function renderComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';
    comments.forEach((comment, index) => {
        const commentItem = document.createElement('li');
        commentItem.innerHTML = `
            <img src="${comment.avatar}" alt="Avatar" class="comment-avatar">
            <div class="comment-content">
                <strong>${comment.name}</strong> (${comment.email})<br>
                <p>${comment.message}</p>
                <div class="comment-actions">
                    <button onclick="editComment(${index})" aria-label="Edit"><i class="ph ph-pencil"></i></button>
                    <button onclick="deleteComment(${index})" aria-label="Delete"><i class="ph ph-trash"></i></button>
                </div>
            </div>
        `;
        commentsList.appendChild(commentItem);
    });
}

// Add comment
function addComment(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const avatar = getRandomAvatar(); // Generate random avatar URL

    comments.push({ name, email, message, avatar });
    localStorage.setItem('comments', JSON.stringify(comments)); // Save to localStorage
    renderComments();

    // Reset form
    document.getElementById('contactForm').reset();
}

// Edit comment
function editComment(index) {
    const comment = comments[index];
    const name = prompt('Edit Name:', comment.name);
    const email = prompt('Edit Email:', comment.email);
    const message = prompt('Edit Message:', comment.message);

    if (name && email && message) {
        comments[index] = { ...comment, name, email, message };
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments();
    }
}

// Delete comment
function deleteComment(index) {
    if (confirm('Are you sure you want to delete this comment?')) {
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments();
    }
}

// Initial render
renderComments();
