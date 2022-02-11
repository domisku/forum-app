export default function renderMemberCount(members) {
  const membersElement = document.querySelector(
    ".sidebar-right__members .sidebar-right__total"
  );

  membersElement.textContent = members.length;
}
