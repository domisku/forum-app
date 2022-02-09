export default function renderMemberCount(questions) {
  const membersElement = document.querySelector(
    ".sidebar-right__members .sidebar-right__total"
  );
  const uniqueMembersMap = {};

  questions.forEach((question) => {
    if (!uniqueMembersMap[question.user]) uniqueMembersMap[question.user] = 1;
  });

  const uniqueMembersCount = Object.keys(uniqueMembersMap).length;

  membersElement.textContent = uniqueMembersCount;
}
