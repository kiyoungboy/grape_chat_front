import { ENV } from "@/env/env";

export const MOCK_CONFIG = {

    enabled: ENV.USE_MOCK,

} as const;