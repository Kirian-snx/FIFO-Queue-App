import supertest from 'supertest';
import app from '../../src/server';
const { initializeCredits, updateCredits } = require('../../src/routes/credits');
import { Credit } from '../../src/models/Credit';


const request = supertest(app);
const originalDate = Date;
const mockDate = new Date('2023-01-01T00:00:00Z');
global.Date = class extends originalDate {
  constructor() {
    super();
    return mockDate;
  }
} as DateConstructor;

describe('Server Routes Test', () => {

  let credits: Credit[];
  const originalDate = Date;
  let mockDate: Date;

  beforeEach(() => {
    mockDate = new Date('2023-01-01T00:00:00Z');
    global.Date = class extends originalDate {
      constructor() {
        super();
        return mockDate;
      }
    } as DateConstructor;

    credits = initializeCredits([
      { type: 'A', maxCredits: 100 },
      { type: 'B', maxCredits: 150 },
      { type: 'C', maxCredits: 200 },
    ]);
  });

  afterEach(() => {
    global.Date = originalDate;
  });


  it('should add an action to the queue', async () => {
    const response = await request
      .post('/actions/add-action')
      .send({ type: 'A' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Action added to the queue.');
  });

  it('should fail to add an inexistant action', async () => {
    const response = await request
      .post('/actions/add-action')
      .send({ type: 'D' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid action type.');
  });

  it('should execute an action', async () => {
  
    const response = await request.post('/actions/execute-action');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Action executed.');
  });

  it('should fail to execute an action when the queue is empty', async () => {
  
    const response = await request.post('/actions/execute-action');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Queue is empty.');
  });

  it('should get the current queue status', async () => {
    const response = await request.get('/actions/queue-status');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('queue');
    expect(response.body).toHaveProperty('credits');
  });

  it('should initialize credits within the specified range', () => {
    const expectedCredits = [
      { type: 'A', lastUpdated: mockDate, maxCredits: 100 },
      { type: 'B', lastUpdated: mockDate, maxCredits: 150 },
      { type: 'C', lastUpdated: mockDate, maxCredits: 200 },
    ];
  
    for (let i = 0; i < expectedCredits.length; i++) {
      const credit = credits[i];
      const expected = expectedCredits[i];
  
      expect(credit.type).toBe(expected.type);
      expect(credit.lastUpdated).toBe(expected.lastUpdated);
      expect(credit.value).toBeGreaterThanOrEqual(expected.maxCredits * 0.8);
      expect(credit.value).toBeLessThanOrEqual(expected.maxCredits);
    }
  });
});