let frames = []

export default {
    set: f => {
        frames = f
    },
    get: () => {
        return frames
    },
}
