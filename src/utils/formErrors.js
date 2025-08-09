export const applyBackendErrors = (errors, setError) => {
    Object.entries(errors).forEach(([field, messages]) => {
        const message = Array.isArray(messages)
        ? messages.join(" | ")
        : messages;
        setError(field, {
        type: "server",
        message: message,
        });
    });
};
