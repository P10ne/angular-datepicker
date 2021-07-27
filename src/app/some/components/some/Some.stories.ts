import { SomeComponent } from "./some.component";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { SomeModule, SomeToken } from "../../some.module";
import { SomeService } from "../../services/some.service";
import { Some1Component } from "../some1/some1.component";
import { SomeDeepService } from "../../services/some-deep.service";

export default {
  title: 'Components/some',
  component: SomeComponent,
  decorators: [
    moduleMetadata({
      declarations: [SomeComponent],
      providers: [
        {
          provide: SomeToken,
          useValue: 'someProvidedString'
        }
      ]
    })
  ]
} as Meta;

const Template: Story<SomeComponent> = (args) => ({
  props: args
})

export const Some = Template.bind({});
Some.args = {
  text: 'some changed text'
}
