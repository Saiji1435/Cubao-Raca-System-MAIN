import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table";

export default function EventLogTable({ logs }: { logs: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-50">
          <th className="p-3 text-[10px] font-black uppercase text-slate-500">Timestamp</th>
          <th className="p-3 text-[10px] font-black uppercase text-slate-500">User</th>
          <th className="p-3 text-[10px] font-black uppercase text-slate-500">Action</th>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs?.map((log) => (
          <TableRow key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
            <TableCell className="p-3 text-[10px] font-medium text-slate-400">
              {format(new Date(log.createdAt), 'MMM dd, HH:mm')}
            </TableCell>
            <TableCell className="p-3">
              <span className="text-[11px] font-bold text-slate-700 uppercase">{log.user?.name}</span>
            </TableCell>
            <TableCell className="p-3 text-[11px] text-slate-600 font-medium">
              {log.summary}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}