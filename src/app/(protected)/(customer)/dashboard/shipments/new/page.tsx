"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Package, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ServiceType } from "@/types/api";
import { zoneService, Zone } from "@/services/zone.service";
import { shipmentService } from "@/services/shipment.service";
import { useCalculatePrice } from "@/lib/query/pricing";
import { useDebounce } from "@/hooks/use-debounce";
import { PriceBreakdownCard } from "@/components/shipments/PriceBreakdownCard";
import { PriceLoadingState } from "@/components/shipments/PriceLoadingState";

export const formSchema = z.object({
  originZoneId: z.string().min(1, "Origin zone is required"),
  destinationZoneId: z.string().min(1, "Destination zone is required"),
  serviceType: z.enum([ServiceType.STANDARD, ServiceType.EXPRESS], {
    required_error: "Service type is required",
  }),
  originAddress: z.string().min(5, "Address must be at least 5 characters"),
  originCity: z.string().min(2, "City is required"),
  destinationAddress: z.string().min(5, "Address must be at least 5 characters"),
  destinationCity: z.string().min(2, "City is required"),
  recipientName: z.string().min(2, "Recipient name is required"),
  recipientPhone: z.string().min(10, "Valid phone number is required"),
  parcel: z.object({
    weight: z.coerce.number().min(0.1, "Weight must be at least 0.1 kg"),
    length: z.coerce.number().min(1, "Length is required (cm)"),
    width: z.coerce.number().min(1, "Width is required (cm)"),
    height: z.coerce.number().min(1, "Height is required (cm)"),
    description: z.string().optional(),
    isFragile: z.boolean().default(false),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = ["Route & Service", "Addresses", "Parcel Details", "Review"];

export default function CreateShipmentWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [zones, setZones] = useState<Zone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originZoneId: "",
      destinationZoneId: "",
      serviceType: ServiceType.STANDARD,
      originAddress: "",
      originCity: "",
      destinationAddress: "",
      destinationCity: "",
      recipientName: "",
      recipientPhone: "",
      parcel: {
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        description: "",
        isFragile: false,
      },
    },
    mode: "onTouched",
  });

  const destinationZoneId = form.watch("destinationZoneId");
  const serviceType = form.watch("serviceType");
  const weight = form.watch("parcel.weight");

  const debouncedDestinationZoneId = useDebounce(destinationZoneId, 500);
  const debouncedServiceType = useDebounce(serviceType, 500);
  const debouncedWeight = useDebounce(weight, 500);

  const {
    data: pricingResult,
    isLoading: isCalculatingPrice,
    error: pricingError
  } = useCalculatePrice({
    destinationZoneId: debouncedDestinationZoneId,
    serviceType: debouncedServiceType,
    weight: Number(debouncedWeight) || 0,
  });

  useEffect(() => {
    const fetchZones = async () => {
      try {
        setIsLoading(true);
        const fetchedZones = await zoneService.getZones();
        setZones(fetchedZones.filter(z => z.isActive));
      } catch {
        toast.error("Failed to load zones");
      } finally {
        setIsLoading(false);
      }
    };
    fetchZones();
  }, []);



  const fieldsByStep: (keyof FormValues)[][] = [
    ["originZoneId", "destinationZoneId", "serviceType"],
    ["originAddress", "originCity", "destinationAddress", "destinationCity", "recipientName", "recipientPhone"],
    ["parcel"],
    [], // Review step doesn't need specific field validation before submit
  ];

  const handleNext = async () => {
    const fieldsToValidate = fieldsByStep[currentStep];
    const isValid = await form.trigger(fieldsToValidate as (keyof FormValues)[]);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      const result = await shipmentService.createShipment(data);
      toast.success("Shipment created successfully!");
        form.reset();
        setCurrentStep(0);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create shipment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formValues = form.getValues();

  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Shipment</h1>
        <p className="text-muted-foreground mt-2">Follow the steps to create a new delivery order.</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10 rounded"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded transition-all duration-300"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          ></div>
          
          {STEPS.map((step, index) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2
                  ${currentStep > index ? 'bg-primary text-primary-foreground border-primary' : 
                    currentStep === index ? 'bg-background text-primary border-primary' : 
                    'bg-background text-muted-foreground border-muted'}`}
              >
                {currentStep > index ? <CheckCircle className="w-5 h-5" /> : index + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${currentStep >= index ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>{STEPS[currentStep]}</CardTitle>
              <CardDescription>
                {currentStep === 0 && "Select service type and operating zones."}
                {currentStep === 1 && "Provide accurate addresses and recipient contact information."}
                {currentStep === 2 && "Enter package dimensions and weight."}
                {currentStep === 3 && "Review shipment details before submitting."}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Step 1: Route & Service */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a service type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={ServiceType.STANDARD}>Standard Delivery</SelectItem>
                            <SelectItem value={ServiceType.EXPRESS}>Express Delivery (Fast)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="originZoneId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Zone</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={isLoading ? "Loading zones..." : "Select pickup zone"}>
                                  {(val: string | null) => {
                                    if (!val) return isLoading ? "Loading zones..." : "Select pickup zone";
                                    const zone = zones.find(z => z.id === val);
                                    return zone ? zone.name : val;
                                  }}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {zones.map((zone) => (
                                <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="destinationZoneId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destination Zone</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={isLoading ? "Loading zones..." : "Select destination zone"}>
                                  {(val: string | null) => {
                                    if (!val) return isLoading ? "Loading zones..." : "Select destination zone";
                                    const zone = zones.find(z => z.id === val);
                                    return zone ? zone.name : val;
                                  }}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {zones.map((zone) => (
                                <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Addresses */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2">Pickup Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="originAddress"
                        render={({ field }) => (
                          <FormItem className="col-span-full md:col-span-1">
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Origin St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="originCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a city" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {(zones.find(z => z.id === form.watch("originZoneId"))?.coverageCities || []).map(city => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2">Delivery Location & Recipient</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="recipientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recipient Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="recipientPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recipient Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="017xxxxxxxx" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="destinationAddress"
                        render={({ field }) => (
                          <FormItem className="col-span-full md:col-span-1">
                            <FormLabel>Delivery Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="456 Destination Ave" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="destinationCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery City</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a city" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {(zones.find(z => z.id === form.watch("destinationZoneId"))?.coverageCities || []).map(city => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Parcel Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="parcel.weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="1.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parcel.length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parcel.width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parcel.height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="parcel.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Electronics, Books" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parcel.isFragile"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 mt-1 accent-primary" 
                            checked={field.value} 
                            onChange={field.onChange} 
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Fragile Item</FormLabel>
                          <FormDescription>
                            Check this if the parcel contains breakable or sensitive items.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-4 border">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      Shipment Summary
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-muted-foreground block text-xs">Service Type</span>
                          <span className="font-medium">{formValues.serviceType}</span>
                        </div>
                        
                        <div>
                          <span className="text-muted-foreground block text-xs">Origin</span>
                          <span className="font-medium">{zones.find(z => z.id === formValues.originZoneId)?.name}</span>
                          <p className="text-muted-foreground mt-0.5">{formValues.originAddress}, {formValues.originCity}</p>
                        </div>

                        <div>
                          <span className="text-muted-foreground block text-xs">Destination</span>
                          <span className="font-medium">{zones.find(z => z.id === formValues.destinationZoneId)?.name}</span>
                          <p className="text-muted-foreground mt-0.5">{formValues.destinationAddress}, {formValues.destinationCity}</p>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-muted-foreground block text-xs">Recipient</span>
                          <span className="font-medium">{formValues.recipientName}</span>
                          <p className="text-muted-foreground mt-0.5">{formValues.recipientPhone}</p>
                        </div>

                        <div>
                          <span className="text-muted-foreground block text-xs">Parcel Details</span>
                          <span className="font-medium">{formValues.parcel.weight} kg</span>
                          <p className="text-muted-foreground mt-0.5">
                            {formValues.parcel.length}x{formValues.parcel.width}x{formValues.parcel.height} cm
                          </p>
                          {formValues.parcel.isFragile && (
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mt-1 bg-destructive/10 text-destructive border-transparent">
                              Fragile
                            </span>
                          )}
                        </div>
                        
                        {formValues.parcel.description && (
                          <div>
                            <span className="text-muted-foreground block text-xs">Contents</span>
                            <span className="font-medium">{formValues.parcel.description}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {isCalculatingPrice ? (
                    <PriceLoadingState />
                  ) : pricingError ? (
                    <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20 font-medium">
                      {pricingError instanceof Error ? pricingError.message : "Failed to calculate price"}
                    </div>
                  ) : pricingResult ? (
                    <PriceBreakdownCard pricing={pricingResult} />
                  ) : null}

                  <p className="text-xs text-muted-foreground text-center">
                    By clicking Confirm & Submit, you agree to the terms of service and confirm that all package details are accurate.
                  </p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between border-t p-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrev}
                disabled={currentStep === 0 || isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < STEPS.length - 1 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting || isCalculatingPrice || !!pricingError}>
                  {isSubmitting ? "Submitting..." : "Confirm & Submit"}
                  {!isSubmitting && <CheckCircle className="w-4 h-4 ml-2" />}
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}




