import requests from "@/utils/request.js";
export function ApplyForClaim(author_id, reason, phone_number) {
    return requests({
        url: '/author/apply',
        method: 'POST',
        data: {
            author_id, reason, phone_number
        }
    });
}
