export const isUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

export const aqReplacements = (input) => {
    let output = input;
    output = output.replaceAll("http://7fb.4c6.myftpupload.com/wp-content", "https://cdn.antiquiet.com/wp-content");
    output = output.replaceAll("http://7fb.4c6.myftpupload.com", "https://antiquiet.com");
    return output;
}