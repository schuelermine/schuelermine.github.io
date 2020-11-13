function toggleCrazy() {
    if (document.getElementById("html").classList.contains("crazy")) {
        document.getElementById("html").classList.remove("crazy");
    } else {
        document.getElementById("html").classList.add("crazy");
    }
}