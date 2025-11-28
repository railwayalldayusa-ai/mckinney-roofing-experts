async function submitLead(event, formId, resultId) {
  event.preventDefault();

  const form = document.getElementById(formId);
  const result = document.getElementById(resultId);

  const data = Object.fromEntries(new FormData(form));

  const response = await fetch("http://localhost:4000/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const json = await response.json();

  if (json.success) {
    result.classList.remove("hidden");
    form.reset();
  } else {
    alert("Error sending lead.");
  }
}
