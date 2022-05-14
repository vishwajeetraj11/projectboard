import { BiSortUp } from 'react-icons/bi';
import { CgBoard, CgLivePhoto } from 'react-icons/cg';
import { MdNotificationsActive } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { TiThMenu } from 'react-icons/ti';

export const features = [
    {
        id: '2',
        Icon: (
            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
            >
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
            </svg>
        ),
        title: 'Manage projects',
        description: 'Create projects for your teams or become a member on another project.'
    },
    {
        id: '3',
        Icon: (
            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
            >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
        title: 'Work together',
        description: 'As you work on a big project keep a track of all the changes using history tab.'
    },
    {
        id: '4',
        Icon: (
            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
            >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        title: 'Specificity',
        description: 'Assign roles and priorities as they suit schedule and member availabilty in a click.'
    },
    {
        id: '5',
        Icon: (
            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
            >
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
            </svg>
        ),
        title: 'Filter tasks',
        description: 'Using our multi layer filter, keep a track of tasks based on multiple fields.'
    }
];

export const newFeatures = [
    {
        id: '1',
        Icon: <CgBoard className="w-10 h-10" />,
        title: 'Boards',
        description:
            'Empower teams to self-manage as they move tasks from one stage to the other and visualize workflows in boards.'
    },
    {
        id: '2',
        Icon: <RiTeamFill className="w-10 h-10" />,
        title: 'Team Management',
        description: 'Provide access to your project or revoke them when necessary.'
    },
    {
        id: '3',
        Icon: <BiSortUp className="w-10 h-10" />,
        title: 'History',
        description: 'Track history of entire project or individual task.'
    },
    {
        id: '4',
        Icon: <MdNotificationsActive className="w-10 h-10" />,
        title: 'Get Notified Immediately',
        description: 'Get Notifications when anyone in team creates or deletes a task or update boards.'
    },
    {
        id: '5',
        Icon: <TiThMenu className="w-10 h-10" />,
        title: 'Context Menu',
        description: "Make new Tasks with interactive menu that appears on every new line when you type '/'."
    },
    {
        id: '6',
        Icon: <CgLivePhoto className="w-10 h-10" />,
        title: 'Live Markdown Editor',
        description:
            'Seamless experience as both a readder and a writer. Providing a real live preview feature to help your concentrate on the content itself.'
    }
];

export const Faqs = [
    {
        id: '1',
        question: 'Why Project Board ?',
        ans: 'Its simple. To remove all the hassle of managing teams and projects with multiple people aboard.'
    },
    {
        id: '2',
        question: 'Task managment would be problematic.',
        ans: 'No, it’s not. Our app comes with advanced filters to separate tasks based on different fronts.'
    },
    {
        id: '3',
        question: 'How can I contact you?',
        ans: 'Head over to instagram @vishwajeet.js or twitter @Vishwajeet323 and DM'
    }
];
