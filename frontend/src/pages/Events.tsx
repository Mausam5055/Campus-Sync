import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModernCalendar } from "@/components/ui/modern-calendar";
import { 
  CalendarX, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Search, 
  Plus, 
  Star,
  Edit,
  Trash2,
  PartyPopper,
  BookOpen,
  Target
} from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  isRegistered: boolean;
  type: string;
  isPast?: boolean;
}

const Events = () => {
  const isLoading = usePageLoading();
  const { toast } = useToast();
  const { user } = useAuth();

  // Check if user can edit events (admins and teachers can, students cannot)
  const canEditEvents = user?.role === 'admin' || user?.role === 'teacher';
  
  // Check if user can register for events (only students can)
  const canRegisterForEvents = user?.role === 'student';

  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: "Computer Science Department Seminar",
      description: "Latest trends in artificial intelligence and machine learning",
      date: "2024-07-28",
      time: "14:00",
      location: "Tech Building Auditorium",
      category: "Academic",
      organizer: "CS Department",
      attendees: 45,
      maxAttendees: 100,
      isRegistered: true,
      type: "Seminar"
    },
    {
      id: '2',
      title: "Student Orientation Week",
      description: "Welcome new students and introduce campus resources",
      date: "2024-08-01",
      time: "09:00",
      location: "Main Campus",
      category: "Social",
      organizer: "Student Affairs",
      attendees: 150,
      maxAttendees: 200,
      isRegistered: false,
      type: "Orientation"
    },
    {
      id: '3',
      title: "Career Fair 2024",
      description: "Meet with top employers and explore career opportunities",
      date: "2024-08-15",
      time: "10:00",
      location: "Student Center",
      category: "Career",
      organizer: "Career Services",
      attendees: 200,
      maxAttendees: 500,
      isRegistered: true,
      type: "Fair"
    },
    {
      id: '4',
      title: "Research Symposium",
      description: "Undergraduate research presentations",
      date: "2024-07-20",
      time: "13:00",
      location: "Science Building",
      category: "Academic",
      organizer: "Research Office",
      attendees: 80,
      maxAttendees: 120,
      isRegistered: false,
      type: "Symposium",
      isPast: true
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '09:00',
    location: '',
    category: 'Academic',
    organizer: '',
    maxAttendees: '50',
    type: 'Seminar'
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '09:00',
      location: '',
      category: 'Academic',
      organizer: '',
      maxAttendees: '50',
      type: 'Seminar'
    });
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      organizer: event.organizer,
      maxAttendees: event.maxAttendees.toString(),
      type: event.type
    });
    setIsDialogOpen(true);
  };

  const handleSaveEvent = () => {
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const eventData: Event = {
      id: editingEvent?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      category: formData.category,
      organizer: formData.organizer,
      attendees: editingEvent?.attendees || 0,
      maxAttendees: parseInt(formData.maxAttendees),
      isRegistered: editingEvent?.isRegistered || false,
      type: formData.type,
      isPast: editingEvent?.isPast || false
    };

    if (editingEvent) {
      setEvents(prev => prev.map(event => event.id === editingEvent.id ? eventData : event));
      toast({
        title: "Event Updated",
        description: "Event details have been successfully updated."
      });
    } else {
      setEvents(prev => [...prev, eventData]);
      toast({
        title: "Event Added",
        description: "New event has been added to the calendar."
      });
    }

    setIsDialogOpen(false);
    resetForm();
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "Event has been removed from the calendar."
    });
  };

  const handleToggleRegistration = (eventId: string) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const newRegistrationStatus = !event.isRegistered;
        const newAttendees = newRegistrationStatus ? event.attendees + 1 : Math.max(0, event.attendees - 1);
        
        toast({
          title: newRegistrationStatus ? "Registered Successfully" : "Unregistered",
          description: newRegistrationStatus 
            ? `You're now registered for ${event.title}` 
            : `You've been unregistered from ${event.title}`
        });
        
        return {
          ...event,
          isRegistered: newRegistrationStatus,
          attendees: newAttendees
        };
      }
      return event;
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "social":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "career":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "study":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes || '0'));
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter(event => !event.isPast);
  const registeredEvents = filteredEvents.filter(event => event.isRegistered && !event.isPast);
  const pastEvents = filteredEvents.filter(event => event.isPast);

  // Calendar functionality
  const eventDates = useMemo(() => {
    return events.reduce((acc, event) => {
      const date = new Date(event.date);
      const dateKey = format(date, 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {} as Record<string, Event[]>);
  }, [events]);

  const getEventsForDate = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return eventDates[dateKey] || [];
  };

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarX className="h-8 w-8 text-primary" />
          <div>
            <h1 className="mobile-heading font-bold">Events</h1>
            <p className="text-muted-foreground mobile-hide-description">
              {user?.role === 'student' 
                ? 'Discover and join campus events' 
                : 'Manage and organize campus events'
              }
            </p>
          </div>
        </div>
        {canEditEvents && (
          <Button onClick={handleAddEvent} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">Total Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {canRegisterForEvents ? registeredEvents.length : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {canRegisterForEvents ? 'Registered' : 'My Events'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">{pastEvents.length}</div>
            <p className="text-xs text-muted-foreground">Past Events</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className={cn(
          "grid w-full",
          canRegisterForEvents ? "grid-cols-4" : "grid-cols-3"
        )}>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          {canRegisterForEvents && (
            <TabsTrigger value="registered">My Events</TabsTrigger>
          )}
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingEvents.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <PartyPopper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No upcoming events found</p>
                    {canEditEvents && (
                      <Button onClick={handleAddEvent}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Event
                      </Button>
                    )}
                  </div>
              </CardContent>
            </Card>
          ) : (
            upcomingEvents.map((event) => {
              const daysUntil = getDaysUntilEvent(event.date);
              const isSeatsLimited = event.attendees / event.maxAttendees > 0.8;
              
              return (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>{event.organizer}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {event.isRegistered && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                        {canEditEvents && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                        <span className="text-muted-foreground">
                          ({daysUntil} days)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(event.time)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees}/{event.maxAttendees} attendees</span>
                        {isSeatsLimited && (
                          <Badge variant="outline" className="text-orange-600">
                            Limited seats
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>

                    <div className="flex gap-2">
                      {canRegisterForEvents && (
                        <Button 
                          size="sm" 
                          variant={event.isRegistered ? "outline" : "default"}
                          onClick={() => handleToggleRegistration(event.id)}
                        >
                          {event.isRegistered ? "Unregister" : "Register"}
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                      <Button size="sm" variant="ghost">
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="registered" className="space-y-4">
          {canRegisterForEvents ? (
            registeredEvents.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No registered events</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              registeredEvents.map((event) => (
                <Card key={event.id} className="border-green-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {event.title}
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        </CardTitle>
                        <CardDescription>{event.organizer}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                        {canEditEvents && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(event.time)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <p className="text-sm text-green-600 dark:text-green-400">
                        ✓ You're registered for this event
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="outline">Add to Calendar</Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleToggleRegistration(event.id)}
                      >
                        Unregister
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {user?.role === 'teacher' ? 'As a teacher, you organize events rather than register for them.' : 'As an admin, you manage events rather than register for them.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastEvents.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No past events</p>
                </div>
              </CardContent>
            </Card>
          ) : (
             pastEvents.map((event) => (
               <Card key={event.id} className="opacity-75 hover:shadow-md transition-shadow">
                 <CardHeader className="pb-3">
                   <div className="flex items-start justify-between">
                     <div className="space-y-1">
                       <CardTitle className="text-lg">{event.title}</CardTitle>
                       <CardDescription>{event.organizer}</CardDescription>
                     </div>
                     <div className="flex items-center gap-2">
                       <Badge variant="outline">Past Event</Badge>
                       {canEditEvents && (
                         <>
                           <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                             <Edit className="h-4 w-4" />
                           </Button>
                           <Button 
                             variant="ghost" 
                             size="sm" 
                             onClick={() => handleDeleteEvent(event.id)}
                             className="text-destructive hover:text-destructive"
                           >
                             <Trash2 className="h-4 w-4" />
                           </Button>
                         </>
                       )}
                     </div>
                   </div>
                 </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Summary</Button>
                    <Button size="sm" variant="ghost">View Photos</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="calendar">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>Click on dates to see event details</CardDescription>
              </CardHeader>
              <CardContent>
                <ModernCalendar
                  selected={selectedDate}
                  onDateSelect={setSelectedDate}
                  highlightedDates={events.map(event => new Date(event.date))}
                  className="w-full"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Select a Date'}
                </CardTitle>
                <CardDescription>
                  {selectedDate && getEventsForDate(selectedDate).length > 0 
                    ? `${getEventsForDate(selectedDate).length} event(s) scheduled`
                    : 'No events scheduled for this date'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).map((event) => (
                      <div key={event.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="font-medium flex items-center gap-2">
                              {event.title}
                              {event.isRegistered && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                            </div>
                            <div className="text-sm text-muted-foreground">{event.organizer}</div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(event.time)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {event.attendees}/{event.maxAttendees}
                              </span>
                            </div>
                          </div>
                          <Badge className={getCategoryColor(event.category)} variant="outline">
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <PartyPopper className="h-8 w-8 mx-auto mb-2" />
                    <p>No events on this date</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Event Dialog */}
      {canEditEvents && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Computer Science Seminar"
                />
              </div>
              <div>
                <Label htmlFor="organizer">Organizer</Label>
                <Input
                  id="organizer"
                  value={formData.organizer}
                  onChange={(e) => setFormData(prev => ({ ...prev, organizer: e.target.value }))}
                  placeholder="e.g., CS Department"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the event"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={formData.maxAttendees}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxAttendees: e.target.value }))}
                  placeholder="50"
                  min="1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Tech Building Auditorium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Career">Career</SelectItem>
                    <SelectItem value="Study">Study</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Culture">Culture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Event Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Orientation">Orientation</SelectItem>
                    <SelectItem value="Festival">Festival</SelectItem>
                    <SelectItem value="Competition">Competition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 pt-4">
              <Button onClick={handleSaveEvent} className="flex-1">
                {editingEvent ? 'Update Event' : 'Create Event'}
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1 md:flex-none">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Events;