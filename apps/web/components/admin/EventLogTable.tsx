import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table";
import { Badge } from "../ui/badge";

interface EventLog {
  id: string;
  action: string;
  summary: string;
  createdAt: string | Date;
  user: {
    name: string | null;
    email: string;
  };
}

interface EventLogTableProps {
  logs: EventLog[];
}

export default function EventLogTable({ logs }: EventLogTableProps) {
  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="w-[180px]">Date & Time</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Summary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                No activity logs found.
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log.id} className="hover:bg-slate-50/50">
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {format(new Date(log.createdAt), 'MMM dd, yyyy HH:mm')}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="uppercase font-semibold text-[10px]">
                    {log.action.replace(/_/g, ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">
                      {log.user.name || 'Unknown User'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {log.user.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="max-w-md truncate text-slate-700">
                  {log.summary}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}