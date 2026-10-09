const siteConfig = {
  name: "Abraham C Martin",
  githubUrl: "",
  email: "",
  defaultLocation: "",
  projects: [
    {
      title: "Maritime Route Intelligence",
      description: "An experimental project exploring maritime routes, voyage conditions, and risk intelligence.",
      category: "Research concept",
      image: "assets/images/project-maritime.svg",
      url: ""
    },
    {
      title: "Blood Donor Connect",
      description: "A concept for helping people discover blood availability and nearby blood banks more easily.",
      category: "Health UX",
      image: "assets/images/project-donor.svg",
      url: ""
    },
    {
      title: "Creative Experiments",
      description: "A growing collection of experiments involving interactive interfaces, AI tools, and visual storytelling.",
      category: "Playground",
      image: "assets/images/project-experiments.svg",
      url: ""
    }
  ],
  reading: [
    {
      title: "Attention Is All You Need",
      description: "Transformers and the foundations of modern AI.",
      topic: "AI foundations",
      url: "https://arxiv.org/abs/1706.03762",
      readingTime: "12 min"
    },
    {
      title: "The Bitter Lesson",
      description: "Learning, computation, and the history of AI research.",
      topic: "AI history",
      url: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html",
      readingTime: "9 min"
    },
    {
      title: "Visualizing AI",
      description: "Exploring neural networks and machine learning visually.",
      topic: "Neural networks",
      url: "https://www.3blue1brown.com/topics/neural-networks",
      readingTime: "10 min"
    },
    {
      title: "Web Design Inspiration",
      description: "Discovering thoughtful websites and visual ideas.",
      topic: "Design",
      url: "https://www.awwwards.com/",
      readingTime: "8 min"
    },
    {
      title: "The Creative Independent",
      description: "Creativity, artistic practice, and creative thinking.",
      topic: "Creative practice",
      url: "https://thecreativeindependent.com/",
      readingTime: "6 min"
    },
    {
      title: "MDN Web Docs",
      description: "Learning and understanding the web.",
      topic: "Web development",
      url: "https://developer.mozilla.org/",
      readingTime: "15 min"
    }
  ]
};

const weatherState = {
  lastLocationKey: null,
  lastCoords: null,
  lastWeather: null,
  inFlight: false
};

const weatherCodeMap = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mostly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Cloudy", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Depositing rime fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Dense drizzle", icon: "🌧️" },
  56: { label: "Freezing drizzle", icon: "🌧️" },
  57: { label: "Heavy freezing drizzle", icon: "🌧️" },
  61: { label: "Light rain", icon: "🌦️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  66: { label: "Freezing rain", icon: "🌧️" },
  67: { label: "Heavy freezing rain", icon: "🌧️" },
  71: { label: "Light snow", icon: "🌨️" },
  73: { label: "Snow", icon: "❄️" },
  75: { label: "Heavy snow", icon: "❄️" },
  77: { label: "Snow grains", icon: "❄️" },
  80: { label: "Rain showers", icon: "🌦️" },
  81: { label: "Heavy showers", icon: "🌧️" },
  82: { label: "Violent showers", icon: "⛈️" },
  85: { label: "Snow showers", icon: "🌨️" },
  86: { label: "Heavy snow showers", icon: "🌨️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  96: { label: "Thunderstorm with hail", icon: "⛈️" },
  99: { label: "Severe thunderstorm", icon: "⛈️" }
};

function renderProjects() {
  const projectGrid = document.getElementById("projectGrid");
  projectGrid.innerHTML = siteConfig.projects
    .map((project) => {
      const link = project.url
        ? `<a class="project-link" href="${project.url}" target="_blank" rel="noreferrer noopener">Explore project <span class="arrow" aria-hidden="true">↗</span></a>`
        : '<span class="project-coming-soon">Coming soon</span>';

      return `
        <article class="project-card">
          <div class="project-visual">
            <span class="project-badge">${project.category}</span>
            <img src="${project.image}" alt="${project.title} visual preview" loading="lazy" decoding="async" width="600" height="380" />
          </div>
          <div class="project-body">
            <div class="project-meta">
              <span>${project.category}</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${link}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderReading() {
  const readingList = document.getElementById("readingList");
  readingList.innerHTML = siteConfig.reading
    .map((item) => {
      const time = item.readingTime ? `<span class="reading-time">${item.readingTime}</span>` : "";
      return `
        <article class="reading-item">
          <a href="${item.url}" target="_blank" rel="noreferrer noopener">
            <div class="reading-topline">
              <span class="reading-topic">${item.topic}</span>
              ${time}
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <span class="reading-footer">Open resource <span aria-hidden="true">↗</span></span>
          </a>
        </article>
      `;
    })
    .join("");
}

function configureFooter() {
  const year = document.getElementById("year");
  year.textContent = new Date().getFullYear();

  const githubLink = document.getElementById("githubLink");
  const emailLink = document.getElementById("emailLink");

  if (siteConfig.githubUrl) {
    githubLink.href = siteConfig.githubUrl;
  } else {
    githubLink.style.display = "none";
  }

  if (siteConfig.email) {
    emailLink.href = `mailto:${siteConfig.email}`;
  } else {
    emailLink.style.display = "none";
  }
}

function setupRevealObserver() {
  const reveals = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    reveals.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((element) => observer.observe(element));
}

function setupMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuButton = document.querySelector(".menu-toggle");

  if (!navLinks || !menuButton) return;

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

function getWeatherDescription(code, isDay = 1) {
  const entry = weatherCodeMap[code] || { label: "Weather conditions", icon: "☁️" };
  return {
    label: entry.label,
    icon: entry.icon,
    isDay
  };
}

function setWeatherLoading(message = "Loading weather…") {
  const weatherStatus = document.getElementById("weatherStatus");
  const weatherLocation = weatherStatus.querySelector(".weather-location");
  const weatherMeta = weatherStatus.querySelector(".weather-meta");
  weatherStatus.classList.add("is-loading");
  weatherLocation.textContent = message;
  weatherMeta.textContent = "Fetching…";
  weatherStatus.querySelector(".weather-icon").textContent = "⏳";
}

function setWeatherError(message) {
  const weatherStatus = document.getElementById("weatherStatus");
  const weatherLocation = weatherStatus.querySelector(".weather-location");
  const weatherMeta = weatherStatus.querySelector(".weather-meta");
  weatherLocation.textContent = "Weather unavailable";
  weatherMeta.textContent = message;
  weatherStatus.querySelector(".weather-icon").textContent = "☁️";
  weatherStatus.classList.remove("is-loading");
}

function formatObservationTime(value) {
  if (!value) return "";

  try {
    const date = new Date(value);
    return `Updated ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  } catch (error) {
    return value;
  }
}

function setWeatherDisplay(locationLabel, weatherData) {
  const weatherStatus = document.getElementById("weatherStatus");
  const weatherLocation = weatherStatus.querySelector(".weather-location");
  const weatherMeta = weatherStatus.querySelector(".weather-meta");
  const weatherIcon = weatherStatus.querySelector(".weather-icon");

  const current = weatherData?.current;
  const weather = current ? getWeatherDescription(current.weather_code, current.is_day) : null;

  if (!current || !weather) {
    setWeatherError("Unable to load weather.");
    return;
  }

  const temp = `${Math.round(current.temperature_2m)}°C`;
  const label = weather.label;
  const observationTime = formatObservationTime(current.time);

  weatherLocation.textContent = `${locationLabel || "Current location"} · ${temp}`;
  weatherMeta.textContent = `${label} · ${observationTime || "Live"}`;
  weatherIcon.textContent = weather.icon;
  weatherStatus.classList.remove("is-loading");
}

async function fetchWithTimeout(url, timeoutMs = 6000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchWeatherByCity(cityName) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new Error("City search failed.");
  }

  const data = await response.json();
  const location = data.results && data.results[0];

  if (!location) {
    throw new Error("No matching city was found.");
  }

  return {
    name: location.name,
    country: location.country || "",
    latitude: location.latitude,
    longitude: location.longitude
  };
}

async function fetchWeatherByCoordinates(latitude, longitude, locationLabel = "Current location") {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&timezone=auto&forecast_days=1`;
  const response = await fetchWithTimeout(weatherUrl, 7000);

  if (!response.ok) {
    throw new Error("Weather fetch failed.");
  }

  const weatherData = await response.json();
  weatherState.lastWeather = weatherData;
  setWeatherDisplay(locationLabel, weatherData);
  return weatherData;
}

async function loadWeatherForCity(cityName) {
  const cleanCity = cityName.trim();
  if (!cleanCity) {
    setWeatherError("Please enter a city name.");
    return;
  }

  if (weatherState.inFlight) return;
  weatherState.inFlight = true;
  setWeatherLoading(`Weather for ${cleanCity}`);
  document.getElementById("weatherError").textContent = "";

  try {
    const location = await fetchWeatherByCity(cleanCity);
    const label = `${location.name}${location.country ? `, ${location.country}` : ""}`;
    weatherState.lastLocationKey = `city:${cleanCity.toLowerCase()}`;
    weatherState.lastCoords = { latitude: location.latitude, longitude: location.longitude };
    await fetchWeatherByCoordinates(location.latitude, location.longitude, label);
  } catch (error) {
    console.error(error);
    setWeatherError("Unable to load weather for that location.");
    document.getElementById("weatherError").textContent = "Please try another city or use your current location.";
  } finally {
    weatherState.inFlight = false;
  }
}

async function refreshWeather() {
  if (weatherState.lastCoords) {
    const label = weatherState.lastLocationKey || "Current location";
    setWeatherLoading(label.includes("city:") ? label.replace("city:", "") : "Current location");
    try {
      await fetchWeatherByCoordinates(weatherState.lastCoords.latitude, weatherState.lastCoords.longitude, weatherState.lastLocationKey ? weatherState.lastLocationKey.replace("city:", "") : "Current location");
      document.getElementById("weatherError").textContent = "";
    } catch (error) {
      console.error(error);
      setWeatherError("Refresh failed. Try again in a moment.");
    }
    return;
  }

  if (siteConfig.defaultLocation) {
    await loadWeatherForCity(siteConfig.defaultLocation);
  } else {
    setWeatherError("Add a city to view the current weather.");
  }
}

function handleWeatherForm() {
  const form = document.getElementById("weatherForm");
  const input = document.getElementById("weatherInput");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) {
      document.getElementById("weatherError").textContent = "Enter a city name to search.";
      return;
    }
    loadWeatherForCity(value);
    input.blur();
  });
}

function handleLocationRequest() {
  const locateButton = document.getElementById("weatherLocateBtn");
  locateButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
      setWeatherError("Geolocation is unavailable in this browser.");
      document.getElementById("weatherError").textContent = "Use the city search instead.";
      return;
    }

    if (weatherState.inFlight) return;
    setWeatherLoading("Finding your location");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const label = "Your location";
          weatherState.lastLocationKey = "location:manual";
          weatherState.lastCoords = {
            latitude: coords.latitude,
            longitude: coords.longitude
          };
          await fetchWeatherByCoordinates(coords.latitude, coords.longitude, label);
          document.getElementById("weatherError").textContent = "";
        } catch (error) {
          console.error(error);
          setWeatherError("Weather for your location is unavailable.");
        }
      },
      (error) => {
        console.warn("Geolocation failed:", error);
        setWeatherError("Location access was denied.");
        document.getElementById("weatherError").textContent = "Please enter a city manually.";
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    );
  });
}

function initializeWeather() {
  const refreshButton = document.getElementById("weatherRefreshBtn");
  refreshButton.addEventListener("click", refreshWeather);

  handleWeatherForm();
  handleLocationRequest();

  if (siteConfig.defaultLocation) {
    loadWeatherForCity(siteConfig.defaultLocation);
  } else {
    setWeatherError("Choose a city for live weather.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  configureFooter();
  renderProjects();
  renderReading();
  setupMobileMenu();
  setupRevealObserver();
  initializeWeather();
});
