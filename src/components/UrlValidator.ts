function validateURL(props : string) {
    // Регулярний вираз для перевірки формату URL
    var regex = /^(https:\/\/github.com\/)[\w-]+\/[\w-]+$/;
    return regex.test(props);
}

export default validateURL;