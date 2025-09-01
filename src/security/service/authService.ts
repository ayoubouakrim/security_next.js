interface AuthResponse {
  id: number;
  accessToken: string;
  username: string;
  email: string;
  roles: string[];
  tokenType: string;
}


const BASE_URL = 'http://localhost:8030';


class AuthService {
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email, password }),
        })

        if (!response.ok) {
            throw new Error('Login failed')
        }
        return response.json()
    }

    async register(user: any): Promise<AuthResponse> {
        const response = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })

        if (!response.ok) {
            throw new Error('Registration failed')
        }
        return response.json()
    }
}

export const authService = new AuthService()