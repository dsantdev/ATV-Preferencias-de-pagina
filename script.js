const STORAGE_KEY = "pagePreferences";
const defaultPreferences = {
  accentColor: "#2563eb",
  screenMode: "light",
  textSize: "medium",
};

const colorPicker = document.getElementById("colorPicker");
const screenMode = document.getElementById("screenMode");
const textSize = document.getElementById("textSize");

function loadPreferences() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return { ...defaultPreferences };
  }

  try {
    return { ...defaultPreferences, ...JSON.parse(raw) };
  } catch {
    return { ...defaultPreferences };
  }
}

function savePreferences(preferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

function applyPreferences(preferences) {
  document.documentElement.style.setProperty("--accent-color", preferences.accentColor);
  document.body.classList.toggle("dark", preferences.screenMode === "dark");

  document.body.classList.remove("text-small", "text-medium", "text-large");
  document.body.classList.add(`text-${preferences.textSize}`);

  colorPicker.value = preferences.accentColor;
  screenMode.value = preferences.screenMode;
  textSize.value = preferences.textSize;
}

let preferences = loadPreferences();
applyPreferences(preferences);

colorPicker.addEventListener("input", (event) => {
  preferences = { ...preferences, accentColor: event.target.value };
  applyPreferences(preferences);
  savePreferences(preferences);
});

screenMode.addEventListener("change", (event) => {
  preferences = { ...preferences, screenMode: event.target.value };
  applyPreferences(preferences);
  savePreferences(preferences);
});

textSize.addEventListener("change", (event) => {
  preferences = { ...preferences, textSize: event.target.value };
  applyPreferences(preferences);
  savePreferences(preferences);
});
