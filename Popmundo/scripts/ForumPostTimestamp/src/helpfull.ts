function sleep(ms = 1e3) {
    return new Promise(res => setTimeout(() => res(undefined), ms));
}