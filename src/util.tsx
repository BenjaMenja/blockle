export function VersionToNumber(version: string): number {
    if (version === "pre-classic") {
        return -6
    }
    if (version === "classic") {
        return -5
    }
    if (version === "indev") {
        return -4
    }
    if (version === "infdev") {
        return -3
    }
    if (version === "alpha") {
        return -2
    }
    else if (version === "beta") {
        return -1
    }
    else {
        return parseFloat(version.split(".", 2)[1])
    }
}

export function NameToDisplayFormat(name: string): string {
    const splitarr = name.split("_")
    const format = splitarr.map((word) => {
        return word[0].toUpperCase() + word.substring(1)
    })
    return format.join(" ")
}
