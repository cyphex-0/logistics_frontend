import { SignJWT } from 'jose';

async function generateFakeSession(role) {
  const secretKey = 'super-secret-key-for-local-dev-only-change-me';
  const key = new TextEncoder().encode(secretKey);
  
  const token = await new SignJWT({
    userId: 'test-user-id',
    email: 'test@example.com',
    role: role,
    name: 'Test User'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key);

  return `session=${token};`;
}

async function testRoute(url, expectedStatus, expectedRedirectUrl, cookie = '') {
  console.log(`Testing ${url} with cookie: ${cookie ? 'provided' : 'none'}`);
  const res = await fetch(`http://localhost:3000${url}`, {
    method: 'GET',
    headers: cookie ? { Cookie: cookie } : {},
    redirect: 'manual', // to capture 307/302/308
  });

  const passedStatus = res.status === expectedStatus;
  const location = res.headers.get('location');
  const passedRedirect = expectedRedirectUrl ? location?.includes(expectedRedirectUrl) : true;

  if (passedStatus && passedRedirect) {
    console.log(`✅ ${url} -> Status: ${res.status}, Redirect: ${location || 'None'}`);
  } else {
    console.error(`❌ ${url} -> Expected Status: ${expectedStatus}, Got: ${res.status}`);
    console.error(`❌ Expected Redirect: ${expectedRedirectUrl}, Got: ${location || 'None'}`);
  }
}

async function runTests() {
  console.log("--- Unauthenticated Access ---");
  await testRoute('/dashboard', 307, '/login');
  await testRoute('/courier', 307, '/login');
  await testRoute('/admin', 307, '/login');
  await testRoute('/profile', 307, '/login');
  await testRoute('/notifications', 307, '/login');

  console.log("\n--- Authenticated Access ---");
  
  const customerSession = await generateFakeSession('CUSTOMER');
  const courierSession = await generateFakeSession('COURIER');
  const adminSession = await generateFakeSession('ADMIN');

  console.log("\n[Customer]");
  // Should allow dashboard
  await testRoute('/dashboard', 200, null, customerSession);
  // Should deny admin/courier and redirect back to /dashboard
  await testRoute('/admin', 307, '/dashboard', customerSession);
  await testRoute('/courier', 307, '/dashboard', customerSession);

  console.log("\n[Courier]");
  // Should allow courier
  await testRoute('/courier', 200, null, courierSession);
  // Should deny admin/dashboard and redirect back to /courier
  await testRoute('/admin', 307, '/courier', courierSession);
  await testRoute('/dashboard', 307, '/courier', courierSession);

  console.log("\n[Admin]");
  // Should allow admin
  await testRoute('/admin', 200, null, adminSession);
  // Should deny customer/courier and redirect back to /admin
  await testRoute('/dashboard', 307, '/admin', adminSession);
  await testRoute('/courier', 307, '/admin', adminSession);

  console.log("\n--- Invalid Cookie Access ---");
  await testRoute('/dashboard', 307, '/login', 'session=invalid-token');
}

runTests().catch(console.error);
