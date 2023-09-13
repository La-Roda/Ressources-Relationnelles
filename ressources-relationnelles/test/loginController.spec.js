const request = require('supertest');
const app = require('../controller/connectionController'); // Remplacez le chemin par le chemin réel vers le contrôleur

// Exemple de test pour la route '/login'
describe('POST /login', () => {
  // Test cas où l'utilisateur existe et les informations sont correctes
  it('should return user JSON if login is successful', async () => {
    const mockUser = {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: 'password',
      permissions_level: 'user',
      birthday: '1990-01-01',
      sex: 'male',
    };

    // Mock de la requête avec les données de l'utilisateur
    const mockRequest = {
      body: {
        email: 'johndoe@example.com',
        password: 'password',
      },
    };

    // Mock de la méthode query du client de la base de données
    const mockClient = {
      query: jest.fn().mockResolvedValue({
        rows: [mockUser],
      }),
    };
    jest.mock('../controller/connectionDatabase', () => mockClient);

    const response = await request(app).post('/login').send(mockRequest);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  // Test cas où l'utilisateur n'existe pas ou les informations sont incorrectes
  it('should return 401 if login is unsuccessful', async () => {
    const mockRequest = {
      body: {
        email: 'nonexistent@example.com',
        password: 'password',
      },
    };

    // Mock de la méthode query du client de la base de données qui renvoie une erreur
    const mockClient = {
      query: jest.fn().mockRejectedValue(new Error('User not found')),
    };
    jest.mock('../controller/connectionDatabase', () => mockClient);

    const response = await request(app).post('/login').send(mockRequest);

    expect(response.status).toBe(401);
    expect(response.text).toBe('Nom d\'utilisateur ou mot de passe incorrect.');
  });
});
