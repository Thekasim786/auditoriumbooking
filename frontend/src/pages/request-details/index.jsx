import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/navigation/MainLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import RequestHeader from './components/RequestHeader';
import FacultyInformation from './components/FacultyInformation';
import FacilityRequirements from './components/FacilityRequirements';
import RequestTimeline from './components/RequestTimeline';

const RequestDetails = () => {
  const navigate = useNavigate();
  const [userRole] = useState('manager');

  const mockRequest = {
    id: "REQ-2026-001",
    status: "pending",
    submittedDate: "10/01/2026",
    submittedTime: "10:30 AM"
  };

  const mockFaculty = {
    name: "Prof. Priya Sharma",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    email: "priya.sharma@university.edu.in",
    phone: "+91 98765 43210",
    employeeId: "EMP-CS-2019-045",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14e2c177f-1763300101315.png",
    profileImageAlt: "Professional headshot of Indian woman with shoulder-length black hair wearing blue formal blazer and white shirt, smiling warmly at camera in office setting"
  };

  const mockEvent = {
    title: "National Conference on Artificial Intelligence and Machine Learning 2026",
    date: "25/02/2026",
    timeSlot: "09:00 AM - 05:00 PM",
    expectedAttendees: 350,
    duration: "8 hours",
    type: "Academic Conference",
    purpose: `The National Conference on Artificial Intelligence and Machine Learning aims to bring together leading researchers, academicians, and industry professionals to discuss recent advancements and future directions in AI/ML technologies.\n\nKey Topics:\n• Deep Learning and Neural Networks\n• Natural Language Processing\n• Computer Vision Applications\n• AI Ethics and Responsible AI\n• Industry Applications and Case Studies\n\nThe conference will feature keynote speeches from renowned experts, technical paper presentations, panel discussions, and networking sessions.`,
    specialRequirements: "High-speed internet connectivity required for live streaming. Separate green room needed for keynote speakers. Catering arrangements for 400 people including lunch and refreshments."
  };

  const mockFacilities = [
  { type: "projector", name: "High-Resolution Projector", quantity: 2 },
  { type: "microphone", name: "Wireless Microphones", quantity: 5 },
  { type: "speakers", name: "Professional Sound System", quantity: 1 },
  { type: "video-conferencing", name: "Video Conferencing Setup", quantity: 1 },
  { type: "stage-lighting", name: "Stage Lighting System", quantity: 1 },
  { type: "podium", name: "Speaker Podium", quantity: 2 },
  { type: "air-conditioning", name: "Central Air Conditioning", quantity: 1 },
  { type: "wifi", name: "High-Speed WiFi", quantity: 1 }];


  const mockTimeline = [
  {
    status: "submitted",
    title: "Request Submitted",
    description: "Booking request submitted by faculty member",
    timestamp: "10/01/2026, 10:30 AM",
    performedBy: "Prof. Priya Sharma"
  },
  {
    status: "under-review",
    title: "Under Review",
    description: "Request assigned to auditorium manager for review",
    timestamp: "10/01/2026, 11:15 AM",
    performedBy: "System Auto-Assignment",
    notes: "Request automatically forwarded to Dr. Rajesh Kumar (Auditorium Manager) based on FCFS policy"
  },
  {
    status: "under-review",
    title: "Manager Viewing",
    description: "Auditorium manager accessed request details",
    timestamp: "10/01/2026, 02:45 PM",
    performedBy: "Dr. Rajesh Kumar"
  }];


  const mockVenues = [
  {
    name: "Main Auditorium",
    location: "Academic Block A, Ground Floor",
    capacity: 500,
    floor: "Ground Floor",
    isAvailable: true,
    availableFacilities: [
    "High-Resolution Projector",
    "Professional Sound System",
    "Wireless Microphones",
    "Video Conferencing",
    "Stage Lighting",
    "Central AC",
    "High-Speed WiFi",
    "Green Room"]

  },
  {
    name: "Seminar Hall",
    location: "Academic Block B, First Floor",
    capacity: 200,
    floor: "First Floor",
    isAvailable: true,
    availableFacilities: [
    "Projector",
    "Sound System",
    "Microphones",
    "Air Conditioning",
    "WiFi"]

  }];


  const mockMessages = [
  {
    sender: "Dr. Rajesh Kumar",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12b9c2bb3-1763293370864.png",
    avatarAlt: "Professional headshot of middle-aged Indian man with short gray hair wearing formal navy blue suit and red tie, confident expression in office environment",
    content: "I have reviewed your request for the AI/ML conference. The Main Auditorium appears to be the best fit for your requirements. Could you please confirm if you need the green room facility?",
    timestamp: "10/01/2026, 03:00 PM"
  },
  {
    sender: "You",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14e2c177f-1763300101315.png",
    avatarAlt: "Professional headshot of Indian woman with shoulder-length black hair wearing blue formal blazer and white shirt, smiling warmly at camera in office setting",
    content: "Yes, we definitely need the green room as we have three keynote speakers who will need a private space before their sessions. Also, please confirm if live streaming equipment is available.",
    timestamp: "10/01/2026, 03:15 PM"
  },
  {
    sender: "Dr. Rajesh Kumar",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12b9c2bb3-1763293370864.png",
    avatarAlt: "Professional headshot of middle-aged Indian man with short gray hair wearing formal navy blue suit and red tie, confident expression in office environment",
    content: "The Main Auditorium has a dedicated green room. For live streaming, we have professional equipment available. I'll include this in the booking confirmation.",
    timestamp: "10/01/2026, 03:30 PM"
  }];


  const mockDocuments = [
  {
    name: "Conference_Proposal_2026.pdf",
    type: "pdf",
    size: 2457600,
    uploadedDate: "10/01/2026",
    description: "Detailed conference proposal including agenda, speaker list, and budget breakdown"
  },
  {
    name: "Speaker_Profiles.docx",
    type: "docx",
    size: 1048576,
    uploadedDate: "10/01/2026",
    description: "Biographical information and credentials of all keynote speakers and panelists"
  },
  {
    name: "Sponsorship_Letters.pdf",
    type: "pdf",
    size: 3145728,
    uploadedDate: "10/01/2026",
    description: "Letters of sponsorship from industry partners and funding organizations"
  }];


  const mockAuditLogs = [
  {
    timestamp: "10/01/2026, 10:30:15 AM",
    action: "created",
    user: "Prof. Priya Sharma",
    userRole: "Faculty",
    details: "Initial request created with event details and facility requirements"
  },
  {
    timestamp: "10/01/2026, 10:32:45 AM",
    action: "updated",
    user: "Prof. Priya Sharma",
    userRole: "Faculty",
    details: "Added document attachments: Conference_Proposal_2026.pdf"
  },
  {
    timestamp: "10/01/2026, 11:15:30 AM",
    action: "viewed",
    user: "System",
    userRole: "Automated",
    details: "Request auto-assigned to Dr. Rajesh Kumar based on FCFS policy"
  },
  {
    timestamp: "10/01/2026, 02:45:20 PM",
    action: "viewed",
    user: "Dr. Rajesh Kumar",
    userRole: "Manager",
    details: "Manager accessed request details for review"
  },
  {
    timestamp: "10/01/2026, 03:00:10 PM",
    action: "commented",
    user: "Dr. Rajesh Kumar",
    userRole: "Manager",
    details: "Manager posted comment requesting green room confirmation"
  },
  {
    timestamp: "10/01/2026, 03:15:45 PM",
    action: "commented",
    user: "Prof. Priya Sharma",
    userRole: "Faculty",
    details: "Faculty responded confirming green room requirement"
  },
  {
    timestamp: "12/01/2026, 06:49:00 AM",
    action: "viewed",
    user: "Dr. Rajesh Kumar",
    userRole: "Manager",
    details: "Manager reviewing request for final approval decision"
  }];


  const handleBack = () => {
    navigate('/manager-dashboard');
  };

  const handleApprove = (requestId, venue, notes) => {
    console.log('Approving request:', requestId, 'Venue:', venue, 'Notes:', notes);
  };

  const handleReject = (requestId, reason) => {
    console.log('Rejecting request:', requestId, 'Reason:', reason);
  };

  const handleRequestModification = (requestId, changes) => {
    console.log('Requesting modifications:', requestId, 'Changes:', changes);
  };

  const handleSendMessage = (message) => {
    console.log('Sending message:', message);
  };

  return (
    <MainLayout userRole={userRole}>
      <div className="space-y-6 md:space-y-8">
        <Breadcrumbs />

        <RequestHeader request={mockRequest} onBack={handleBack} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <FacultyInformation faculty={mockFaculty} />
            <FacilityRequirements facilities={mockFacilities} />
          </div>

          <div className="space-y-6 md:space-y-8">
            <RequestTimeline timeline={mockTimeline} />

          </div>
        </div>

      </div>
    </MainLayout>);

};

export default RequestDetails;