import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';

interface ExportReportButtonProps {
    clubId: string;
    reportType?: 'members' | 'events' | 'analytics' | 'full';
}

export function ExportReportButton({ clubId, reportType = 'full' }: ExportReportButtonProps) {
    const handleExport = async (format: 'csv' | 'pdf') => {
        try {
            const response = await api.get(
                `/clubs/${clubId}/reports/${reportType}`,
                {
                    params: { format },
                    responseType: 'blob',
                }
            );

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `club-report-${reportType}-${new Date().toISOString().split('T')[0]}.${format}`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success(`Report exported as ${format.toUpperCase()}`);
        } catch (error) {
            console.error('Failed to export report:', error);
            toast.error('Failed to export report');
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport('csv')}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Export as PDF
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
