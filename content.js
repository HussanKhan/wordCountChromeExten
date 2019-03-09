// INJECTED TO WEBPAGE
// Only knows whats going on in webpage, restricted

console.log("CONTENT SCRIPT RUNNING");


// Extracts body of text to get paragraphs
const parsePage = () => {

    let content = "";
    
    const page = document.getElementsByTagName("body")[0].innerText;

    const myReg = /[A-Z].+[\.\?\!][\s]/mg;

    const matches = page.match(myReg);

    matches.forEach(para => {
        content += para;
    });

    console.log(content);

    const wordCount = content.split(" ").length;

    console.log(wordCount);
    

    chrome.runtime.sendMessage({request: "newPage",title: "some page", wc: wordCount}, (res) => {
        console.log("Response from backend");
    });

    // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log(request);
//     // request();
//     sendResponse("From backend: Hello");
// });


};

window.onload = () => {
    parsePage();
};