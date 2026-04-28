const inquiryForm = document.querySelector("#inquiry-form");
const formStatus = document.querySelector("#form-status");
const languageButtons = document.querySelectorAll("[data-language]");
const calendarGrid = document.querySelector("#calendar-grid");
const calendarMonth = document.querySelector("#calendar-month");
const prevMonthButton = document.querySelector("#prev-month");
const nextMonthButton = document.querySelector("#next-month");
const timeSlots = document.querySelector("#time-slots");
const appointmentDateInput = document.querySelector("#appointment-date");
const appointmentTimeInput = document.querySelector("#appointment-time");
const schedulerStatus = document.querySelector("#scheduler-status");
const selectedDateLabel = document.querySelector("#selected-date-label");
const availabilityPanel = document.querySelector("#availability-panel");
const nextUrlInput = document.querySelector("#next-url");
const conditionalFields = document.querySelectorAll("[data-condition-field]");

let currentLanguage = "en";
let calendarDate = new Date();
let selectedDate = "";
let selectedTime = "";
const availableTimes = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];
const bookedSlots = {
  // Add booked times by date, for example:
  // "2026-05-01": ["12:00 PM", "4:00 PM"],
};

const arabicText = {
  "Planning & Styling": "تنظيم وتنسيق مناسبات",
  Services: "الخدمات",
  Process: "الخطوات",
  Contact: "تواصل معنا",
  "Event planning • decor • setup": "تنظيم مناسبات • ديكور • تجهيز",
  "Elegant events, planned and styled for you.": "مناسبة بتصميم أنيق وتنفيذ متكامل.",
  "Weddings, birthdays, gender reveals, engagements, graduations, and grand openings.":
    "زفاف، أعياد ميلاد، كشف جنس المولود، خطوبة، تخرج، وافتتاحات رسمية.",
  "Get a Quote": "احصل على عرض سعر",
  Instagram: "إنستغرام",
  "Planning + coordination": "تخطيط وتنسيق",
  "Timeline, vendors, setup.": "جدول، موردين، وتجهيز.",
  "Decor + setup": "ديكور وتجهيز",
  "Backdrops, balloons, florals.": "خلفيات، بالونات، زهور.",
  "Clear quotes": "عروض سعر واضحة",
  "Survey, call, quote.": "استبيان، مكالمة، عرض سعر.",
  "Planning, decor, and setup.": "تخطيط، ديكور، وتجهيز.",
  "Custom quotes based on your event.": "عرض سعر حسب تفاصيل المناسبة.",
  Weddings: "الزفاف",
  Ceremony: "المراسم",
  Reception: "الاستقبال",
  "Ceremony styling": "تنسيق المراسم",
  "Reception decor": "ديكور الاستقبال",
  "Vendor coordination": "تنسيق الموردين",
  Birthdays: "أعياد الميلاد",
  Theme: "الثيم",
  Balloons: "بالونات",
  Desserts: "حلويات",
  "Theme design": "تصميم الثيم",
  "Balloon installs": "تركيب البالونات",
  "Dessert tables": "طاولات الحلويات",
  "Gender Reveals": "كشف جنس المولود",
  Reveal: "لحظة الكشف",
  Backdrop: "الخلفية",
  "Reveal setup": "تجهيز الكشف",
  "Backdrop design": "تصميم الخلفية",
  "Balloon styling": "تنسيق البالونات",
  "Engagement Parties": "حفلات الخطوبة",
  Tables: "طاولات",
  Tablescapes: "تنسيق الطاولات",
  Florals: "الزهور",
  Photos: "صور",
  Graduations: "التخرج",
  Colors: "ألوان",
  "School colors": "ألوان التخرج",
  "Photo backdrop": "خلفية تصوير",
  "Guest tables": "طاولات الضيوف",
  "Grand Openings": "الافتتاحات",
  Ribbon: "الشريط",
  Branding: "الهوية",
  Guests: "ضيوف",
  "Ribbon cutting": "قص الشريط",
  "Branded decor": "ديكور للعلامة",
  "Guest flow": "تنظيم الضيوف",
  "View Instagram": "إنستغرام",
  Backdrops: "الخلفيات",
  "Balloon Art": "تنسيق البالونات",
  "Our process": "آلية العمل",
  "Book in 4 steps": "احجز خلال 4 خطوات",
  "Share details": "مشاركة التفاصيل",
  "Tell us your event type, date, guest count, style, and needs.":
    "اكتب نوع المناسبة، التاريخ، عدد الضيوف، الأسلوب المطلوب، والخدمات.",
  "Book a call": "حجز مكالمة",
  "Choose a time and talk through your vision with us.": "اختر الوقت المناسب لمناقشة الرؤية وتفاصيل المناسبة.",
  "Get a quote": "استلام العرض",
  "Receive clear pricing based on your event plan.": "نرسل لك عرضا واضحا حسب احتياج المناسبة.",
  "Create your dream event": "تنفيذ مناسبة أحلامك",
  "We plan, style, and set up the celebration.": "نقوم بالتخطيط، التنسيق، والتجهيز ليوم المناسبة.",
  "Online consultation": "استشارة أونلاين",
  "Get pricing": "احصل على السعر",
  "Start with the survey.": "ابدأ بالاستبيان",
  "Start Survey": "ابدأ الآن",
  "Now booking": "الحجز متاح الآن",
  "Book a Call": "احجز مكالمة",
  Vian: "فيان",
  Nibras: "نبراس",
  "Contact Now": "تواصل الآن",
  "Co-founders": "الشريكان المؤسسان",
  "Co-founder": "شريك مؤسس",
  "Call or Text": "اتصال أو رسالة",
  Email: "البريد الإلكتروني",
  "Quick Survey": "استبيان سريع",
  "Event details for your quote.": "تفاصيل لعرض السعر.",
  Name: "الاسم",
  "Full Name": "الاسم الكامل",
  "Phone Number": "رقم الهاتف",
  "Email Address": "البريد الإلكتروني",
  "Choose one": "اختر خيارا",
  Text: "رسالة",
  Phone: "مكالمة",
  Email: "بريد إلكتروني",
  "Event Type": "نوع المناسبة",
  Event: "نوع المناسبة",
  Engagement: "خطوبة",
  Wedding: "زفاف",
  Birthday: "عيد ميلاد",
  "Engagement Party": "حفلة خطوبة",
  Graduation: "تخرج",
  "Grand Opening": "افتتاح رسمي",
  "Baby Shower": "استقبال مولود",
  "Corporate Event": "فعالية عمل",
  "Private Party": "حفلة خاصة",
  Other: "أخرى",
  "Event Date": "تاريخ المناسبة",
  Date: "التاريخ",
  "Event Time": "وقت المناسبة",
  Time: "الوقت",
  Morning: "صباحا",
  Afternoon: "بعد الظهر",
  Evening: "مساء",
  "Event Duration": "مدة المناسبة",
  Duration: "المدة",
  "1-3 hours": "1-3 ساعات",
  "4-6 hours": "4-6 ساعات",
  "Full day": "يوم كامل",
  "Guest Count": "عدد الضيوف",
  "Under 25": "أقل من 25",
  "25-50": "25-50",
  "50-100": "50-100",
  "100-200": "100-200",
  "200+": "200+",
  "Event Setting": "مكان المناسبة",
  Setting: "الموقع",
  Indoor: "داخلي",
  Outdoor: "خارجي",
  Both: "كلاهما",
  Venue: "المكان",
  "Yes, I have a venue/place": "نعم، المكان محدد",
  "No, I need help finding one": "لا، أحتاج مساعدة في إيجاد مكان",
  "Venue Address": "عنوان المكان",
  "Event Style / Theme": "أسلوب المناسبة",
  Elegant: "أنيق",
  Modern: "مودرن",
  Rustic: "ريفي",
  Luxury: "فاخر",
  Minimalist: "بسيط",
  "Cultural / Traditional": "تراثي / تقليدي",
  "Custom Theme": "ثيم مخصص",
  "Preferred Colors": "الألوان المفضلة",
  "Inspiration Photos": "صور الإلهام",
  Inspiration: "الإلهام",
  "Yes, I will share them": "نعم، سيتم مشاركتها",
  No: "لا",
  "I need help finding inspiration": "أحتاج مساعدة",
  "Services Interested In": "الخدمات المطلوبة",
  "Needed Services": "الخدمات المطلوبة",
  "Needed Services Optional": "الخدمات اختيارية",
  "Full Event Planning": "تنظيم كامل",
  "Partial Planning": "تخطيط جزئي",
  "Decoration & Setup": "ديكور وتجهيز",
  "Floral Arrangements": "تنسيق زهور",
  "Balloon Design": "بالونات",
  "Table & Chair Rentals": "طاولات وكراسي",
  "Backdrop Design": "تصميم الخلفيات",
  Lighting: "إضاءة",
  Cake: "كيك",
  "DJ / Entertainment": "دي جي / ترفيه",
  "Photography / Videography": "تصوير",
  "Cleanup Services": "تنظيف",
  "Estimated Budget Range": "الميزانية المتوقعة",
  Budget: "الميزانية",
  "Under $500": "أقل من 500 دولار",
  "Under $1,000": "أقل من 1,000 دولار",
  "$1,000 - $3,000": "1,000 - 3,000 دولار",
  "$3,000 - $7,000": "3,000 - 7,000 دولار",
  "$7,000 - $15,000": "7,000 - 15,000 دولار",
  "$15,000+": "15,000 دولار فأكثر",
  "When Do You Need a Quote?": "متى تحتاج عرض السعر؟",
  "Quote Needed": "موعد عرض السعر",
  ASAP: "في أقرب وقت",
  "Within 2-3 days": "خلال 2-3 أيام",
  "Within a week": "خلال أسبوع",
  "Schedule Call": "اختيار موعد المكالمة",
  "Available Times": "الأوقات المتاحة",
  "Select a date": "اختر تاريخا",
  Sun: "أحد",
  Mon: "اثن",
  Tue: "ثلا",
  Wed: "أرب",
  Thu: "خمي",
  Fri: "جمع",
  Sat: "سبت",
  "Select a date and time.": "اختر التاريخ والوقت",
  "Inspiration Images Optional": "صور الإلهام اختيارية",
  "Inspiration Images": "صور الإلهام",
  "Upload mood boards, color ideas, backdrops, or decor inspiration.":
    "أرفق صور ألوان، خلفيات، أو أفكار ديكور.",
  "Special Requests": "طلبات خاصة",
  Notes: "ملاحظات",
  "Notes Optional": "ملاحظات اختيارية",
  Submit: "إرسال الطلب",
  "Send Inquiry": "إرسال الطلب",
  Book: "احجز",
  "Book a Consultation": "احجز استشارة",
};

const arabicPlaceholders = {
  "Your name": "الاسم",
  "(555) 000-0000": "(555) 000-0000",
  "you@example.com": "you@example.com",
  "Blush, gold, ivory...": "وردي، ذهبي، عاجي...",
  "Venue name or address": "اسم المكان أو العنوان",
  "Example: Saturday morning or weekday evening": "مثال: صباح السبت أو مساء أحد أيام الأسبوع",
  "Tell us more about your vision, theme, venue, or special requests":
    "اكتب المزيد عن الرؤية، الثيم، المكان، أو أي طلبات خاصة",
};

const originalText = new WeakMap();
const originalPlaceholders = new WeakMap();

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function translatePage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach((node) => {
    if (!normalizeText(node.textContent)) {
      return;
    }

    if (!originalText.has(node)) {
      originalText.set(node, node.textContent);
    }

    const english = normalizeText(originalText.get(node));
    const leadingSpace = originalText.get(node).match(/^\s*/)[0];
    const trailingSpace = originalText.get(node).match(/\s*$/)[0];
    node.textContent =
      language === "ar" && arabicText[english]
        ? `${leadingSpace}${arabicText[english]}${trailingSpace}`
        : originalText.get(node);
  });

  document.querySelectorAll("body *").forEach((element) => {
    if (element.placeholder !== undefined && element.placeholder) {
      if (!originalPlaceholders.has(element)) {
        originalPlaceholders.set(element, element.placeholder);
      }

      const englishPlaceholder = originalPlaceholders.get(element);
      element.placeholder =
        language === "ar" ? arabicPlaceholders[englishPlaceholder] || englishPlaceholder : englishPlaceholder;
    }
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.language === language);
  });

  renderCalendar();
}

function clearFieldValue(field) {
  field.querySelectorAll("input, select, textarea").forEach((input) => {
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
      return;
    }

    if (input.type === "file") {
      input.value = "";
      return;
    }

    input.value = "";
  });
}

function updateConditionalSurveyFields() {
  conditionalFields.forEach((field) => {
    const sourceName = field.dataset.conditionField;
    const expectedValue = field.dataset.conditionValue;
    const source = inquiryForm?.querySelector(`[name="${sourceName}"]`);
    const shouldShow = source?.value === expectedValue;

    field.classList.toggle("is-hidden", !shouldShow);
    if (!shouldShow) {
      clearFieldValue(field);
    }

    field.querySelectorAll("input, select, textarea").forEach((input) => {
      input.disabled = !shouldShow;
    });
  });
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => translatePage(button.dataset.language));
});

translatePage("en");
updateConditionalSurveyFields();

inquiryForm?.addEventListener("change", (event) => {
  if (event.target.matches("select")) {
    updateConditionalSurveyFields();
  }
});

function toDateValue(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function updateSchedulerStatus() {
  if (!schedulerStatus) {
    return;
  }

  schedulerStatus.classList.remove("error");

  if (selectedDate && selectedTime) {
    schedulerStatus.classList.add("selected");
    schedulerStatus.innerHTML =
      currentLanguage === "ar"
        ? `<span>تم اختيار الموعد</span><strong>${getReadableDate(selectedDate)} • ${selectedTime}</strong>`
        : `<span>Selected appointment</span><strong>${getReadableDate(selectedDate)} • ${selectedTime}</strong>`;
    return;
  }

  schedulerStatus.classList.remove("selected");
  schedulerStatus.textContent = currentLanguage === "ar" ? "اختر التاريخ والوقت." : "Select a date and time.";
}

function getReadableDate(dateValue) {
  if (!dateValue) {
    return currentLanguage === "ar" ? "اختر التاريخ" : "Select a date";
  }

  const date = new Date(`${dateValue}T12:00:00`);
  return date.toLocaleDateString(currentLanguage === "ar" ? "ar" : "en", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function renderTimeSlots() {
  if (!timeSlots) {
    return;
  }

  timeSlots.innerHTML = "";
  availabilityPanel?.classList.toggle("hidden", !selectedDate);
  selectedDateLabel.textContent = getReadableDate(selectedDate);
  selectedDateLabel.classList.toggle("selected", Boolean(selectedDate));

  availableTimes.forEach((time) => {
    const isBooked = Boolean(selectedDate && bookedSlots[selectedDate]?.includes(time));
    const button = document.createElement("button");
    button.type = "button";
    button.className = "time-slot";
    button.innerHTML = `<span>${time}</span>${isBooked ? "<small>Booked</small>" : ""}`;
    button.disabled = !selectedDate || isBooked;
    button.classList.toggle("selected", time === selectedTime);
    button.classList.toggle("booked", isBooked);

    button.addEventListener("click", () => {
      if (isBooked || !selectedDate) {
        return;
      }

      selectedTime = time;
      appointmentTimeInput.value = time;
      clearValidationState();
      setFormMessage("");
      renderTimeSlots();
      updateSchedulerStatus();
    });

    timeSlots.appendChild(button);
  });
}

function renderCalendar() {
  if (!calendarGrid || !calendarMonth) {
    return;
  }

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarMonth.textContent = firstDay.toLocaleDateString(currentLanguage === "ar" ? "ar" : "en", {
    month: "long",
    year: "numeric",
  });
  calendarGrid.innerHTML = "";

  for (let i = 0; i < firstDay.getDay(); i += 1) {
    const blank = document.createElement("span");
    blank.className = "calendar-blank";
    calendarGrid.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const value = toDateValue(date);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.textContent = day;
    button.disabled = date < today;
    button.classList.toggle("selected", value === selectedDate);

    button.addEventListener("click", () => {
      selectedDate = value;
      selectedTime = "";
      appointmentDateInput.value = value;
      appointmentTimeInput.value = "";
      clearValidationState();
      setFormMessage("");
      renderCalendar();
      renderTimeSlots();
      updateSchedulerStatus();
    });

    calendarGrid.appendChild(button);
  }

  renderTimeSlots();
  updateSchedulerStatus();
}

prevMonthButton?.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  renderCalendar();
});

nextMonthButton?.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  renderCalendar();
});

renderCalendar();

function formatAppointment(appointmentDate, appointmentTime) {
  if (!appointmentDate || !appointmentTime) {
    return "";
  }

  if (currentLanguage === "ar") {
    return ` بتاريخ ${appointmentDate} الساعة ${appointmentTime}`;
  }

  return ` on ${appointmentDate} at ${appointmentTime}`;
}

function getSubmitMessage(name, eventType, appointmentDate, appointmentTime) {
  if (currentLanguage === "ar") {
    return name
      ? `شكرا ${name}. تم استلام طلب ${eventType}${formatAppointment(appointmentDate, appointmentTime)}. سيتم التواصل للتأكيد.`
      : `شكرا. تم استلام الطلب${formatAppointment(appointmentDate, appointmentTime)}. سيتم التواصل للتأكيد.`;
  }

  return name
    ? `Thanks, ${name}. We received your ${eventType.toLowerCase()} request${formatAppointment(appointmentDate, appointmentTime)}. We will contact you to confirm.`
    : `Thanks. We received your request${formatAppointment(appointmentDate, appointmentTime)}. We will contact you to confirm.`;
}

function getSelectedText(selectName) {
  const select = inquiryForm.querySelector(`[name="${selectName}"]`);
  return select?.selectedOptions[0]?.textContent || "";
}

function setFormMessage(message, isError = false) {
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.classList.toggle("error", isError);
}

function clearValidationState() {
  inquiryForm.querySelectorAll(".field-error").forEach((field) => {
    field.classList.remove("field-error");
  });
  schedulerStatus?.classList.remove("error");
}

function markInvalid(control) {
  const field = control.closest("label, fieldset");
  field?.classList.add("field-error");
  control.focus({ preventScroll: true });
  field?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function validateInquiryForm() {
  clearValidationState();

  const requiredFields = inquiryForm.querySelectorAll("input[required], select[required], textarea[required]");
  for (const field of requiredFields) {
    if (field.disabled) {
      continue;
    }

    if (!field.value.trim()) {
      markInvalid(field);
      return currentLanguage === "ar"
        ? "يرجى إكمال السؤال المحدد قبل إرسال الطلب."
        : "Please complete the highlighted question before submitting.";
    }

    if (field.type === "email" && !field.validity.valid) {
      markInvalid(field);
      return currentLanguage === "ar"
        ? "يرجى إدخال بريد إلكتروني صحيح."
        : "Please enter a valid email address.";
    }
  }

  if (!appointmentDateInput.value || !appointmentTimeInput.value) {
    document.querySelector("#scheduler")?.classList.add("field-error");
    schedulerStatus?.classList.add("error");
    if (schedulerStatus) {
      schedulerStatus.textContent =
        currentLanguage === "ar" ? "يرجى اختيار تاريخ ووقت المكالمة." : "Please choose a call date and time.";
    }
    document.querySelector("#scheduler")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return currentLanguage === "ar" ? "يرجى اختيار تاريخ ووقت المكالمة." : "Please choose a call date and time.";
  }

  return "";
}

inquiryForm?.addEventListener("input", clearValidationState);
inquiryForm?.addEventListener("change", clearValidationState);

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const validationMessage = validateInquiryForm();
    if (validationMessage) {
      setFormMessage(validationMessage, true);
      return;
    }

    const formData = new FormData(inquiryForm);
    const name = formData.get("name")?.toString().trim();
    const eventType = getSelectedText("event-type");
    const appointmentDate = formData.get("appointment-date")?.toString();
    const appointmentTime = formData.get("appointment-time")?.toString();

    setFormMessage(currentLanguage === "ar" ? "جاري إرسال الطلب..." : "Sending your inquiry...");

    if (nextUrlInput && window.location.protocol.startsWith("http")) {
      nextUrlInput.value = new URL("thank-you.html", window.location.href).href;
    }

    setTimeout(() => {
      HTMLFormElement.prototype.submit.call(inquiryForm);
    }, 300);
  });
}
