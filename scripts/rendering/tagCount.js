export default function renderTagCount(questions) {
  const tagMap = {};

  for (let question of questions) {
    question.tags.forEach((tag) => {
      tagMap[tag] ? tagMap[tag]++ : (tagMap[tag] = 1);
    });
  }

  const sortedTags = Object.entries(tagMap).sort(
    (cur, next) => next[1] - cur[1]
  );

  const tagsList = document.querySelector(".sidebar-right__tags-list");

  if (sortedTags.length > 8) {
    const toggleTagsButton = document.createElement("button");
    toggleTagsButton.textContent = "See more tags";
    toggleTagsButton.classList.add("sidebar-right__button");
    toggleTagsButton.addEventListener("click", (event) => {
      if (event.target.textContent === "See more tags") {
        createTagElements(sortedTags, true);
        toggleTagsButton.textContent = "See less tags";
      } else {
        createTagElements(sortedTags, false);
        toggleTagsButton.textContent = "See more tags";
      }
    });
    tagsList.insertAdjacentElement("afterend", toggleTagsButton);
  }

  createTagElements(sortedTags);
}

function createTagElements(sortedTags, showAll = false) {
  const tagsList = document.querySelector(".sidebar-right__tags-list");
  const tagItems = tagsList.querySelectorAll(".sidebar-right__tags-item");

  Array.from(tagItems).forEach((tag) => tag.remove());

  let index = 0;
  for (let [tagName, tagCount] of sortedTags) {
    if (index === 8 && !showAll) break;
    const tagElement = document.createElement("li");
    tagElement.classList.add("sidebar-right__tags-item");
    tagElement.textContent = tagName;
    tagElement.dataset.count = "x " + tagCount;

    tagsList.appendChild(tagElement);
    index++;
  }
}
