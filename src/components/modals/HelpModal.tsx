import FeedbackIcon from 'assets/icons/chat.svg';
import DiscordIcon from 'assets/icons/discord.svg';
import GithubIcon from 'assets/icons/github.svg';
import GuideIcon from 'assets/icons/guide.svg';
import QuestionIcon from 'assets/icons/question.svg';
import Modal from 'components/modals/Modal';
import React from 'react';

interface Props {
    isOpen: boolean;
    onDismiss?: () => void;
}

interface HelpProps {
    icon: React.ReactNode;
    title: string;
    text: string;
    link: string;
}
function HelpSection({ icon, title, text, link }: HelpProps) {
    return (
        <a className="flex items-start py-3" href={link} target="_blank" rel="noreferrer">
            <div className="pt-1">{icon}</div>
            <div className="flex flex-col justify-center flex-grow ml-3 border-b border-gray-100">
                <div className="text-gray-800 text-sm mb-1.5">{title}</div>
                <div className="text-sm font-normal text-gray-500">{text}</div>
            </div>
        </a>
    );
}
export default function HelpModal({ isOpen, onDismiss }: Props) {
    return (
        <Modal title="Help" isOpen={isOpen} onDismiss={onDismiss}>
            <div className="flex flex-col w-full pl-8 pr-5 overflow-y-auto">
                <HelpSection
                    icon={<img src={GuideIcon} alt="Read more about Project Board features" />}
                    title="Project Board"
                    text="Read more about Project Board and tell us about your experience."
                    link="https://vishwajeetraj11.hashnode.dev/introducing-product-board-a-project-management-platform"
                />
                <HelpSection
                    icon={<img src={DiscordIcon} alt="Ask questions and help others" />}
                    title="Join Hashnode's discord community"
                    text="Ask questions and help others"
                    link="https://discord.gg/TEJnayXT"
                />
                <HelpSection
                    icon={<img src={QuestionIcon} alt="Let us know if there's an issue" />}
                    title="Contact support"
                    text="Let us know of an issue"
                    link="https://www.instagram.com/vishwajeet.js/"
                />
                <HelpSection
                    icon={<img src={GithubIcon} alt="Check out source code" />}
                    title="Source Code"
                    text="Check out the source code"
                    link="https://github.com/vishwajeetraj11/projectboard"
                />
                <HelpSection
                    icon={<img src={FeedbackIcon} alt="OS Resume" />}
                    title="OS Resume"
                    text="Our previous project"
                    link="https://vishwajeetraj11.hashnode.dev/introducing-os-resume-oversimplified-resume-builder"
                />
            </div>
        </Modal>
    );
}
