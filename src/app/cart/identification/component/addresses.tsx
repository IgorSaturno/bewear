"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";

import {
  CreateShippingAddressSchema,
  createShippingAddressSchema,
} from "@/actions/create-shipping-address/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateShippingAddress } from "@/hooks/mutation/use-create-shipping-address";
import { useShippingAddresses } from "@/hooks/queries/use-shipping-addresses";

const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const createShippingAddressMutation = useCreateShippingAddress();
  const { data: addresses, isLoading } = useShippingAddresses();

  const form = useForm<CreateShippingAddressSchema>({
    resolver: zodResolver(createShippingAddressSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cpf: "",
      phone: "",
      cep: "",
      address: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = (values: CreateShippingAddressSchema) => {
    createShippingAddressMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        setSelectedAddress(null);
      },
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <p className="text-muted-foreground">Carregando endereços...</p>
          </div>
        ) : (
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
          >
            {addresses?.map((address) => (
              <Card key={address.id}>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <div className="flex-1">
                      <Label htmlFor={address.id} className="cursor-pointer">
                        <div className="space-y-1">
                          {/* <p className="font-medium">{address.recipientName}</p> */}
                          <p className="text-muted-foreground text-sm">
                            {address.recipientName}, {address.street},{" "}
                            {address.number}
                            {address.complement &&
                              `, ${address.complement}`} -{" "}
                            {address.neighborhood}, {address.city} -{" "}
                            {address.state}, CEP: {address.zipCode}
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add_new" id="add_new" />
                  <Label htmlFor="add_new">Adicionar novo endereço</Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>
        )}

        {selectedAddress && selectedAddress !== "add_new" && (
          <div className="mt-6">
            <Button className="h-12 w-full text-base">
              Continuar com o pagamento
            </Button>
          </div>
        )}

        {selectedAddress === "add_new" && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Adicionar novo</CardTitle>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CardContent className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite seu nome completo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Celular</FormLabel>
                          <FormControl>
                            <PatternFormat
                              format="(##) #####-####"
                              mask="_"
                              customInput={Input}
                              value={field.value}
                              onValueChange={(values) =>
                                field.onChange(values.value)
                              }
                              onBlur={field.onBlur}
                              getInputRef={field.ref}
                              placeholder="(11) 98765-4321"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF</FormLabel>
                          <FormControl>
                            <PatternFormat
                              format="###.###.###-##"
                              mask="_"
                              customInput={Input}
                              value={field.value}
                              onValueChange={(values) =>
                                field.onChange(values.value)
                              }
                              onBlur={field.onBlur}
                              getInputRef={field.ref}
                              placeholder="000.000.000-00"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cep"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <PatternFormat
                              format="#####-###"
                              mask="_"
                              customInput={Input}
                              value={field.value}
                              onValueChange={(values) =>
                                field.onChange(values.value)
                              }
                              onBlur={field.onBlur}
                              getInputRef={field.ref}
                              placeholder="00000-000"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input placeholder="Rua, avenida..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input placeholder="Número" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="complement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complemento</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Complemento (opcional)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input placeholder="Bairro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Cidade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input placeholder="UF" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>

                <div className="px-6 pb-6">
                  <Button
                    type="submit"
                    className="h-12 w-full text-base"
                    disabled={createShippingAddressMutation.isPending}
                  >
                    {createShippingAddressMutation.isPending
                      ? "Salvando..."
                      : "Continuar com o pagamento"}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
