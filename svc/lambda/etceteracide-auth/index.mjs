// relax, these won't be used in production
const valid_tokens_for_applications = [
    "a147549773dfc1830f8568aef1",
    "54977dfc1814755683dfaef773"
];

export const handler = async (event) => {
    let { headers: { authorization } } = event;
    const response = {
        "isAuthorized": valid_tokens_for_applications.includes(authorization)
    }
    return response;
};