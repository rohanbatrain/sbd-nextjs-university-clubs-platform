import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface Photo {
    id: string;
    url: string;
    caption?: string;
    uploaded_by?: string;
    uploaded_at: string;
}

interface EventGalleryProps {
    eventId: string;
    clubId: string;
    canUpload?: boolean;
}

export function EventGallery({ eventId, clubId, canUpload = false }: EventGalleryProps) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

    useEffect(() => {
        loadPhotos();
    }, [eventId]);

    const loadPhotos = async () => {
        try {
            setIsLoading(true);

            // Mock photos until backend implements photo gallery
            const mockPhotos: Photo[] = [
                {
                    id: '1',
                    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
                    caption: 'Team working on hackathon project',
                    uploaded_at: new Date().toISOString(),
                },
                {
                    id: '2',
                    url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
                    caption: 'Workshop presentation',
                    uploaded_at: new Date().toISOString(),
                },
                {
                    id: '3',
                    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
                    caption: 'Group photo',
                    uploaded_at: new Date().toISOString(),
                },
                {
                    id: '4',
                    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
                    caption: 'Networking session',
                    uploaded_at: new Date().toISOString(),
                },
            ];

            setPhotos(mockPhotos);
        } catch (error) {
            console.error('Failed to load photos:', error);
            toast.error('Failed to load photos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        try {
            setIsUploading(true);

            const formData = new FormData();
            Array.from(files).forEach(file => {
                formData.append('photos', file);
            });

            // Upload photos
            await api.post(`/clubs/events/${eventId}/photos`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Photos uploaded successfully');
            loadPhotos();
            setUploadDialogOpen(false);
        } catch (error) {
            console.error('Failed to upload photos:', error);
            toast.error('Failed to upload photos');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeletePhoto = async (photoId: string) => {
        try {
            await api.delete(`/clubs/events/${eventId}/photos/${photoId}`);
            toast.success('Photo deleted');
            setPhotos(photos.filter(p => p.id !== photoId));
            setSelectedPhoto(null);
        } catch (error) {
            console.error('Failed to delete photo:', error);
            toast.error('Failed to delete photo');
        }
    };

    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            </Card>
        );
    }

    return (
        <>
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Event Gallery</h3>
                    {canUpload && (
                        <Button onClick={() => setUploadDialogOpen(true)} size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Photos
                        </Button>
                    )}
                </div>

                {photos.length === 0 ? (
                    <div className="text-center py-12">
                        <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-muted-foreground">No photos yet</p>
                        {canUpload && (
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => setUploadDialogOpen(true)}
                            >
                                Upload First Photo
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photos.map((photo) => (
                            <div
                                key={photo.id}
                                className="relative group cursor-pointer aspect-square overflow-hidden rounded-lg border"
                                onClick={() => setSelectedPhoto(photo)}
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.caption || 'Event photo'}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all">
                                    <div className="absolute bottom-0 left-0 right-0 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-xs truncate">{photo.caption}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Upload Dialog */}
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Photos</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center">
                            <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileUpload}
                                disabled={isUploading}
                                className="hidden"
                                id="photo-upload"
                            />
                            <label htmlFor="photo-upload" className="cursor-pointer">
                                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-muted-foreground">
                                    Click to select photos or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    PNG, JPG up to 10MB each
                                </p>
                            </label>
                        </div>
                        {isUploading && (
                            <div className="flex items-center justify-center">
                                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                                <span className="text-sm">Uploading...</span>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Photo Viewer Dialog */}
            <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
                <DialogContent className="max-w-4xl">
                    {selectedPhoto && (
                        <>
                            <DialogHeader>
                                <div className="flex items-start justify-between">
                                    <DialogTitle>{selectedPhoto.caption || 'Event Photo'}</DialogTitle>
                                    {canUpload && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeletePhoto(selectedPhoto.id)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </DialogHeader>
                            <img
                                src={selectedPhoto.url}
                                alt={selectedPhoto.caption || 'Event photo'}
                                className="w-full h-auto rounded-lg"
                            />
                            <p className="text-sm text-muted-foreground">
                                Uploaded {new Date(selectedPhoto.uploaded_at).toLocaleDateString()}
                            </p>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
