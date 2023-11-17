
export function __filename(): string {
    return new URL("", import.meta.url).pathname;
}

export function __dirname(): string{
    return new URL(".", import.meta.url).pathname;
}

