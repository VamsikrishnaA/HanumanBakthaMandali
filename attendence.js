// ==========================================
// DOM ELEMENTS
// ==========================================

const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");

const resultsContainer = document.getElementById("resultsContainer");
const emptyState = document.getElementById("emptyState");

const gotramBtn = document.getElementById("gotramBtn");
const gotramModal = document.getElementById("gotramModal");
const closeGotramModal = document.getElementById("closeGotramModal");

const attendanceModal = document.getElementById("attendanceModal");
const removeModal = document.getElementById("removeModal");

const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

const removeBtn = document.getElementById("removeBtn");
const cancelRemoveBtn = document.getElementById("cancelRemoveBtn");

const popupMessage = document.getElementById("popupMessage");
const removePopupMessage = document.getElementById("removePopupMessage");

const template = document.getElementById("familyCardTemplate");


// ==========================================
// VARIABLES
// ==========================================

let selectedFamily = null;


// ==========================================
// INITIAL LOAD
// ==========================================

window.onload = () => {

    emptyState.style.display = "block";
    resultsContainer.innerHTML = "";

};


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener("input", function () {

    const keyword = this.value.trim().toLowerCase();

    if (keyword === "") {

        emptyState.style.display = "block";
        resultsContainer.innerHTML = "";

        return;
    }

    emptyState.style.display = "none";

    searchFamilies(keyword);

});


// ==========================================
// CLEAR SEARCH
// ==========================================

clearBtn.addEventListener("click", () => {

    searchInput.value = "";

    resultsContainer.innerHTML = "";

    emptyState.style.display = "block";

});


// ==========================================
// GOTRAM POPUP
// ==========================================

gotramBtn.addEventListener("click", () => {

    gotramModal.style.display = "flex";

});

closeGotramModal.addEventListener("click", () => {

    gotramModal.style.display = "none";

});

window.addEventListener("click", function (e) {

    if (e.target === gotramModal) {

        gotramModal.style.display = "none";

    }

});

// ==========================================
// SEARCH FUNCTION
// ==========================================

function searchFamilies(keyword) {

    resultsContainer.innerHTML = "";

    const filtered = families.filter(family => {

        // Search by Gotram
        if (family.searchKeys.some(key =>
            key.toLowerCase().includes(keyword))) {
            return true;
        }

        // Search by Family Head
        if (family.head.toLowerCase().includes(keyword)) {
            return true;
        }

        // Search by Members
        if (family.members.some(member =>
            member.toLowerCase().includes(keyword))) {
            return true;
        }

        return false;

    });

    if (filtered.length === 0) {

        resultsContainer.innerHTML = `
            <div class="empty-state">
                <div class="search-icon">😔</div>
                <h2>No Results Found</h2>
            </div>
        `;

        return;
    }

    filtered.forEach(renderFamilyCard);

}


// ==========================================
// RENDER CARD
// ==========================================

function renderFamilyCard(family) {

    const card = template.content.cloneNode(true);

    card.querySelector(".gotram-name").textContent =
        family.gotram;

    card.querySelector(".family-head").textContent =
        family.head;

    const list = card.querySelector(".members-list");

    family.members.forEach(member => {

        const li = document.createElement("li");

        li.textContent = member;

        list.appendChild(li);

    });

    const checkbox =
        card.querySelector(".attendance-check");

    checkbox.checked = family.attended;

    if (family.attended) {

        card.querySelector(".family-card")
            .classList.add("attended");

    }

    checkbox.addEventListener("change", function () {

        selectedFamily = family;

        if (this.checked) {

            popupMessage.innerHTML =
                `<b>${family.head}</b><br><br>
                Mark Attendance?`;

            attendanceModal.style.display = "flex";

        }

        else {

            removePopupMessage.innerHTML =
                `<b>${family.head}</b><br><br>
                Remove Attendance?`;

            removeModal.style.display = "flex";

        }

    });

    resultsContainer.appendChild(card);

}