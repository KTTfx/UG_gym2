# University of Ghana Gym Management System

A comprehensive web application for managing gym memberships and subscriptions at the University of Ghana.

## Features

### User Authentication
- **Student/Staff Login**: Login using University ID and password
- **Public Login**: Login using email and password
- **Registration System**: 
  - Separate flows for university members and public users
  - Medical condition declaration for students
  - Automatic status handling based on medical conditions

### User Types
1. **Students**
   - University ID verification
   - Special pricing
   - Medical clearance system
   - Hall of residence information

2. **Staff**
   - University ID verification
   - Department information
   - Medical clearance system
   - Special pricing

3. **Public Users**
   - Email-based registration
   - Medical clearance system
   - Standard pricing

4. **Admin**
   - Comprehensive dashboard
   - User management
   - Subscription approval system
   - Medical clearance verification

### Subscription Management
- **Multiple Plan Types**
  - Walk In plan
  - Monthly Plan
  - Semesterly/Quarterly plan
- **Different Pricing** for:
  - Students/Staff
  - Public users
- **Subscription Features**
  - Duration tracking
  - Expiration dates
  - Renewal management
  - Progress tracking

### Medical System
- Medical condition declaration
- Automatic hold status for medical cases
- Medical clearance requirement
- Admin verification system

### Dashboard Features

#### User Dashboard
- Current subscription status
- Days remaining visualization
- Plan details


#### Admin Dashboard
- **User Management**
  - Quick approval system
  - Detailed user information
  - Medical status tracking
  - Subscription management
- **Search & Filter**
  - Name search
  - Email search
  - ID search
  - Phone number search
- **Status Filters**
  - All users
  - Pending approvals
  - Active memberships
  - On-hold status
  - Medical cases
- **Quick Actions**
  - Approve subscriptions
  - Put on hold
  - View detailed information

### Payment System
- Payment pending notification
- In-person payment instructions
- Payment confirmation system
- Automatic activation upon approval


### Testing Workflows

1. **Registration Testing**
   - Test student registration with medical condition
   - Test staff registration
   - Test public user registration
   - Verify email format validation
   - Check password confirmation

2. **Login Testing**
   - Test university member login
   - Test public user login
   - Test invalid credentials
   - Verify redirect to appropriate dashboard

3. **Subscription Testing**
   - Test plan selection
   - Verify pricing differences
   - Check payment pending page
   - Test subscription approval
   - Verify success page

4. **Admin Features Testing**
   - Test quick approval
   - Test search functionality
   - Test filters
   - Verify user details modal
   - Test status updates

5. **Medical System Testing**
   - Test medical condition declaration
   - Verify automatic hold status
   - Test medical clearance workflow
   - Check admin medical verification

## Technical Stack

- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Context API for state management

## Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Development Guidelines

### Code Structure
- Components in `src/components`
- Pages in `src/pages`
- Types in `src/types`
- Sample data in `src/data`

### Styling
- Tailwind CSS classes
- Custom color scheme:
  - Primary: #002147 (UG Blue)
  - Secondary: #FFD700 (Gold)
  - Success: Green variants
  - Warning: Yellow variants
  - Error: Red variants

### State Management
- React hooks for local state
- Context for global state
- Sample data for development

## Security Considerations

- Password hashing (to be implemented)
- Session management (to be implemented)
- Role-based access control
- Input validation


## Future Enhancements

1. Backend Integration
   - Real database implementation
   - User authentication system
   - Payment gateway integration

2. Additional Features
   - Email notifications
   - Mobile app version
   - QR code access
   - Attendance tracking
   - Workout tracking
   - Class scheduling

3. Analytics
   - Usage statistics
   - Revenue reports
   - Membership trends
   - Peak hours analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

