import axios from 'axios';

async function testSignup() {
    try {
        console.log('Sending signup request...');
        const res = await axios.post('http://localhost:5000/api/auth/signup', {
            name: 'Test Agent',
            email: 'agent@test.com',
            password: 'password123'
        });
        console.log('✅ Signup Success:', res.data);
    } catch (err) {
        console.error('❌ Signup Failed:', err.response?.data || err.message);
    }
}

testSignup();
