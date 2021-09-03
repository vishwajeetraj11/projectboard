
import { Avatar } from 'components/Avatar';
import { ChangeHistoryRow } from 'components/history/ChangeHistoryRow';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { historyActionType } from 'shared/constants';
import { User_Populated_History } from 'shared/types';
import { getParsedDate } from 'shared/utils/formatDate';
import { RootState } from 'store/store';

interface Props {
  history: User_Populated_History;
  // task?: boolean; // Check if this component is used to display only 1 task History
}

interface MatchParams {
  projectId: string;
}

export const HistoryRow: React.FC<Props> = ({ history: h }) => {

  const { projectData } = useSelector((state: RootState) => state.currentProject);

  const create = h.action === historyActionType.CREATE;
  const update = h.action === historyActionType.UPDATE;
  const del = h.action === historyActionType.DELETE;
  const change = h.action === historyActionType.CHANGE;
  const assign = h.action === historyActionType.ASSIGN;
  const addMember = h.action === historyActionType.ADD_MEMBER;
  const removeMember = h.action === historyActionType.REMOVE_MEMBER;

  // const fullName = `${h?.user?.firstName} ${h?.user?.lastName}`;

  const match = useRouteMatch<MatchParams>();

  return (
    <Link to={`/projects/${match.params.projectId}/tasks/${h?.task}`} className='px-4 py-4 border-b border-gray-100 hover:bg-gray-100 transition-all flex flex-row items-center flex-wrap relative'>
      {/* {
        create ? <CreateHistoryRow />
          : update ? <UpdateHistoryRow />
            : del ? <DeleteHistoryRow />
              : change ? <ChangeHistoryRow />
                : assign ? <AssignHistoryRow />
                  : addMember ? <AddMemberRow />
                    : removeMember ? <RemoveMemberRow />
      } */}
      <Avatar name={`${h?.user?.firstName} ${h?.user?.lastName}`} />
      <p className='ml-2 mr-3 font-medium w-28'>{`${h?.user?.firstName} ${h?.user?.lastName}`}</p>
      {projectData.access === 'admin' && <span className='text-xs font-normal text-gray-500 uppercase mr-2  mt-2 lg:mt-0 w-full lg:w-auto'>{h?.task}</span>}
      {
        create ? <p className='text-gray-500 text-xs bg-gray-50 hover:bg-white px-1 py-1 rounded-md mt-2 lg:mt-0 w-full lg:w-auto'>{`Created Task: ${h?.extraDetails?.taskTitle?.length > 73 ? h?.extraDetails?.taskTitle?.slice(0, 73) + "..." : h?.extraDetails?.taskTitle}`}</p>
          // :  ? <p className='text-gray-500 text-xs bg-gray-50 hover:bg-white px-1 py-1 rounded-md mt-2 lg:mt-0 w-full lg:w-auto'>{`Updated Task: ${h?.extraDetails?.taskTitle?.length > 73 ? h?.extraDetails?.taskTitle?.slice(0, 73) + "..." : h?.extraDetails?.taskTitle}`}</p>
          : del ? <p className='text-gray-500 text-xs bg-gray-50 hover:bg-white px-1 py-1 rounded-md mt-2 lg:mt-0 w-full lg:w-auto'>{`Deleted Task: ${h?.extraDetails?.taskTitle?.length > 73 ? h?.extraDetails?.taskTitle?.slice(0, 73) + "..." : h?.extraDetails?.taskTitle}`}</p>
            : (change || update) ? <ChangeHistoryRow extraDetails={h?.extraDetails} />
              : assign ? <p className='text-gray-500 text-xs bg-gray-50 hover:bg-white px-1 py-1 rounded-md mt-2 lg:mt-0 w-full lg:w-auto'>{`Assigned Task to ${h?.extraDetails?.user?.firstName} ${h?.extraDetails?.user?.lastName}`}</p>
                : addMember ? <p className='text-gray-500 text-xs bg-gray-50 hover:bg-white px-1 py-1 rounded-md mt-2 lg:mt-0 w-full lg:w-auto'>{`Added Member: ${h?.extraDetails?.user?.firstName} ${h?.extraDetails?.user?.lastName} to the project.`}</p>
                  : removeMember ? <p className='text-gray-500 text-xs bg-gray-50 hover:bg-white px-1 py-1 rounded-md mt-2 lg:mt-0 w-full lg:w-auto'>{`Removed Member: ${h?.extraDetails?.user?.firstName} ${h?.extraDetails?.user?.lastName} from the project.`}</p> : undefined
      }
      <p className='ml-auto top-4 right-4 absolute lg:static text-gray-400 font-medium'>{getParsedDate(new Date(h.createdAt))}</p>
    </Link>
  );
};
